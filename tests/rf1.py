from asyncio import sleep
import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

class TestLogin(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("https://soltecqa-22fd5.web.app/login")

        # Esperar explícitamente que la página esté cargada por completo antes de proceder
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, "email")))

    def test_1_login_exitoso(self):
        driver = self.driver

        start_time = time.time()


        time.sleep(1)
        username = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "email")))
        password = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "password")))
        username.send_keys("tony@example.com")
        password.send_keys("12345678")

        driver.find_element(By.XPATH, "//button[@type='submit']").click()

        WebDriverWait(driver, 10).until(EC.url_changes("https://soltecqa-22fd5.web.app/ControlPanel"))

        end_time = time.time()

        # Calcular el tiempo transcurrido
        elapsed_time = end_time - start_time
        print(f"Tiempo transcurrido para el inicio de sesión exitoso: {elapsed_time:.2f} segundos")


        driver.save_screenshot("tests/evidencia_inicio_sesion_exitoso.png")

    def test_2_login_incorrecto(self):
        driver = self.driver

        start_time = time.time()    

        time.sleep(1)
        username = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "email")))
        password = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "password")))
        username.send_keys("tony@example.com")
        password.send_keys("123456789")

        driver.find_element(By.XPATH, "//button[@type='submit']").click()
        
        try:
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "modal-headline")))
            self.assertEqual(driver.current_url, "https://soltecqa-22fd5.web.app/login")
            
        except TimeoutException:
            self.fail("El modal-headline no apareccione.")

        end_time = time.time()

        # Calcular el tiempo transcurrido
        elapsed_time = end_time - start_time
        print(f"Tiempo transcurrido para el inicio de sesión incorrecto: {elapsed_time:.2f} segundos")

        driver.save_screenshot("tests/evidencia_inicio_sesion_incorrecto.png")

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()




