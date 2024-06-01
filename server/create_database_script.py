import psycopg2, os
from psycopg2 import Error

from dotenv import load_dotenv

# Load variables from .env file into environment
load_dotenv()

environment = "DEV"  # or PROD

# Accessing environment variables
database_name = os.getenv(f"POSTGRE_DB_NAME_{environment}")
database_user = os.getenv(f"POSTGRE_DB_USER_{environment}")
database_password = os.getenv(f"POSTGRE_DB_PASSWORD_{environment}")
database_host = os.getenv(f"POSTGRE_DB_HOST_{environment}")
database_port = os.getenv(f"POSTGRE_DB_PORT_{environment}")


def create_database():
    try:
        # Connect to default PostgreSQL database
        connection = psycopg2.connect(user=database_user,
                                      password=database_password,
                                      host=database_host,
                                      port=database_port)
        connection.autocommit = True

        # Create a cursor object
        cursor = connection.cursor()

        # Create the spatial_db database
        cursor.execute("CREATE DATABASE spatial_db;")

        print("Database 'spatial_db' created successfully.")

    except (Exception, Error) as error:
        print("Error while connecting to PostgreSQL:", error)

    finally:
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed.")


def create_table():
    try:
        # Connect to the spatial_db database
        connection = psycopg2.connect(user=database_user,
                                      password=database_password,
                                      host=database_host,
                                      port=database_port,
                                      database=database_name)
        connection.autocommit = True

        # Create a cursor object
        cursor = connection.cursor()

        # Create the Todo table
        create_table_query = '''CREATE TABLE Todo (
            todo_id SERIAL PRIMARY KEY,
            description VARCHAR(50),
            category VARCHAR(15),
            creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_complete BOOLEAN,
            completion_state VARCHAR(20)
        );'''
        cursor.execute(create_table_query)

        print("Table 'Todo' created successfully.")

    except (Exception, Error) as error:
        print("Error while creating PostgreSQL table:", error)

    finally:
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed.")


if __name__ == "__main__":
    create_database()
    create_table()
