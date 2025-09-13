import requests
from bs4 import BeautifulSoup
import re

def extract_problem_statements(url):
    """
    Extracts problem statements from a given URL.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for HTTP errors

        soup = BeautifulSoup(response.content, 'html.parser')

        # Find elements containing problem statements. This might need to be adjusted
        # based on the website's HTML structure. Look for headings, list items, or
        # divs with specific classes.
        # Example: looking for h3 tags that seem to be titles
        problem_statement_titles = []
        for tag in soup.find_all(['h3', 'h4', 'p']):
            text = tag.get_text(strip=True)
            # Use a regular expression to find patterns that look like titles
            if re.search(r'^\d+\.\s+[A-Za-z]', text):
                problem_statement_titles.append(text)

        return problem_statement_titles

    except requests.exceptions.RequestException as e:
        print(f"Error accessing the URL: {e}")
        return None

if __name__ == "__main__":
    # URL for Smart India Hackathon 2025 problem statements
    # This URL might change or become inactive.
    sih_url = "https://www.sih.gov.in/sih2025PS"  # Use the correct URL for the year

    statements = extract_problem_statements(sih_url)

    if statements:
        print("Found the following problem statements:")
        for statement in statements:
            print(statement)

        # You can save this output to a file
        with open("problem_statements.txt", "w", encoding="utf-8") as file:
            for statement in statements:
                file.write(statement + "\n")
        print("\nProblem statements have been saved to 'problem_statements.txt'.")
    else:
        print("Could not retrieve problem statements.")