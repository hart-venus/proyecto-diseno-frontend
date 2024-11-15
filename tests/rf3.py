from asyncio import sleep
import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

class TestForgotPassword(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("https://soltecqa-22fd5.web.app/login")

        # Esperar explícitamente que la página esté cargada por completo antes de proceder
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, "email")))

    def test_1_olvide_contrasena(self):
        driver = self.driver

        time.sleep(1)

        start_time = time.time()
        driver.find_element(By.XPATH, "//button[text()='Olvidé mi contraseña']").click()

        time.sleep(1)   
         # Espera y llena el campo de correo electrónico
        email_input = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//input[@type='email' and @placeholder='Ingrese su correo electrónico']"))
        )
        email_input.clear()  # Limpia el campo
        email_input.send_keys("cl03994@gmail.com")  # Envía el correo electrónico
        
        # Espera a que el botón de enviar sea visible y clickeable
        submit_button = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//button[@type='submit' and contains(@class, 'bg-indigo-500')]"))
        )

        submit_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[@type='submit' and contains(@class, 'bg-indigo-500')]"))
        )

        end_time = time.time()

        # Calcular el tiempo transcurrido
        elapsed_time = end_time - start_time
        print(f"Tiempo transcurrido para el envío de correo electrónico: {elapsed_time:.2f} segundos")

        # Desplaza la vista al botón
        driver.execute_script("arguments[0].scrollIntoView();", submit_button)

        # Agrega una pausa si es necesario
        time.sleep(1)

        # Haz clic en el botón
        driver.execute_script("arguments[0].click();", submit_button)

        driver.save_screenshot("tests/evidencia_olvide_contrasena.png")



    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()




