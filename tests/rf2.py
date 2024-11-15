from asyncio import sleep
import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestPassword(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("https://soltecqa-22fd5.web.app/login")

        # Esperar explícitamente que la página esté cargada por completo antes de proceder
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, "email")))

    def test_1_cambio_contrasena_exitosa(self):
        driver = self.driver

        time.sleep(1)
        username = driver.find_element(By.ID, "email")
        password = driver.find_element(By.ID, "password")
        username.send_keys("tony@example.com")
        password.send_keys("12345678")

        driver.find_element(By.XPATH, "//button[@type='submit']").click()

        WebDriverWait(driver, 10).until(EC.url_changes("https://soltecqa-22fd5.web.app/login"))
        
        time.sleep(1)
        driver.find_element(By.XPATH, "//button[text()='Cuenta']").click()

        start_time = time.time()

        time.sleep(1)
        driver.find_element(By.ID, "newPassword").send_keys("123456789")
        driver.find_element(By.ID, "confirmNewPassword").send_keys("123456789")

        driver.find_element(By.XPATH, "//input[@type='submit' and @value='Cambiar contraseña']").click()

        WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//p[@class='text-green-500']"))
        )

        end_time = time.time()

        # Calcular el tiempo transcurrido
        elapsed_time = end_time - start_time
        print(f"Tiempo transcurrido para cambiar la contrasena: {elapsed_time:.2f} segundos")

        # Devolverse al login
        time.sleep(1)
        driver.find_element(By.XPATH, "//button[text()='Regresar']").click()
        driver.find_element(By.XPATH, "//button[text()='Log Out']").click()

        # Probaar iniciar sesion con la nueva contrasena
        time.sleep(1)
        username = driver.find_element(By.ID, "email")
        password = driver.find_element(By.ID, "password")
        username.send_keys("tony@example.com")
        password.send_keys("123456789")

        driver.find_element(By.XPATH, "//button[@type='submit']").click()

        WebDriverWait(driver, 10).until(EC.url_changes("https://soltecqa-22fd5.web.app/login"))
        self.assertEqual(driver.current_url, "https://soltecqa-22fd5.web.app/ControlPanel")


        driver.save_screenshot("tests/evidencia_cambio_contrasena_exitosa.png")


    def test_2_login_incorrecto_cambio_contrasena(self):
        driver = self.driver

        start_time = time.time()

        time.sleep(1)
        username = driver.find_element(By.ID, "email")
        password = driver.find_element(By.ID, "password")
        username.send_keys("tony@example.com")
        password.send_keys("12345678")

        driver.find_element(By.XPATH, "//button[@type='submit']").click()

        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "modal-headline")))

        end_time = time.time()

        # Calcular el tiempo transcurrido
        elapsed_time = end_time - start_time
        print(f"Tiempo transcurrido para el inicio de sesión incorrecto: {elapsed_time:.2f} segundos")

        driver.save_screenshot("tests/evidencia_cambio_contrasena_incorrecto.png")

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()




