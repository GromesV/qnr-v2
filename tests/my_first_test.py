import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import HtmlTestRunner


class FindLink(unittest.TestCase):
    def setUp(self):
        options = webdriver.ChromeOptions()
        options.add_argument("--incognito")
        options.add_argument("--headless")
        self.driver = webdriver.Chrome(options=options, service=Service(ChromeDriverManager().install()))

    def test_link(self):
        self.driver.get("https://www.blic.rs/")
        web_dev_link = self.driver.find_element(By.ID, 'top')
        # Test atleast we have one link with name  "Web Development"
        self.assertIsNotNone(web_dev_link)

    def tearDown(self):
        self.driver.quit()


if __name__ == '__main__':
    unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(output='example_dir'))