---
siderbar_position: 1
---

# Introducción

Antes de entrar a herramientas más avanzadas como **Executor**, **Callable** o **Future**, es importante comprender qué son los **hilos (threads)** y cómo se crean de manera básica en Java.

---

## ¿Qué es un hilo?

Un **hilo** es una unidad de ejecución dentro de un programa. Cuando ejecutamos un programa en Java, por defecto se crea un **hilo principal** llamado `main`, que es el que ejecuta el método `main()`.

Los hilos permiten que un programa realice **varias tareas al mismo tiempo**. Por ejemplo:

* Escuchar música mientras escribes en un documento.
* Descargar un archivo mientras navegas en internet.
* Que un videojuego actualice los gráficos mientras calcula la física del juego.

En resumen: los hilos hacen posible la **concurrencia**.

---

## Crear un hilo en Java

En Java existen dos formas principales de crear hilos:

### 1. Extender la clase `Thread`

```java title="EjemploThread.java" showLineNumbers
class MiHilo extends Thread {
    public void run() {
        System.out.println("El hilo está corriendo: " + Thread.currentThread().getName());
    }
}

public class EjemploThread {
    public static void main(String[] args) {
        MiHilo hilo1 = new MiHilo();
        hilo1.start(); // Inicia el hilo

        System.out.println("Hilo principal: " + Thread.currentThread().getName());
    }
}
```

### Posible salida

```
Hilo principal: main
El hilo está corriendo: Thread-0
```

Observa que se ejecutan **dos hilos en paralelo**: el `main` y `Thread-0`.

---

### 2. Implementar la interfaz `Runnable`

La interfaz **Runnable** es más flexible porque permite separar la lógica del hilo de la clase principal.

```java title="EjemploRunnable.java" showLineNumbers
class MiRunnable implements Runnable {
    public void run() {
        System.out.println("Hilo ejecutado: " + Thread.currentThread().getName());
    }
}

public class EjemploRunnable {
    public static void main(String[] args) {
        Thread hilo1 = new Thread(new MiRunnable());
        hilo1.start();

        System.out.println("Hilo principal: " + Thread.currentThread().getName());
    }
}
```

### Salida esperada

```
Hilo principal: main
Hilo ejecutado: Thread-0
```

---
## ¿Por qué usar hilos?

* **Eficiencia**: mejoran el uso del procesador al aprovechar múltiples núcleos.
* **Multitarea**: permiten ejecutar varias acciones de manera casi simultánea.
* **Experiencia de usuario**: evitan que un programa se congele mientras hace tareas pesadas.

---

## Ejemplos

### Ejemplo 1: Reloj digital en consola

```java title="Reloj.java" showLineNumbers
import java.time.LocalTime;

class Reloj implements Runnable {
    public void run() {
        try {
            while (true) {
                System.out.println("Hora actual: " + LocalTime.now());
                Thread.sleep(1000); // espera 1 segundo
            }
        } catch (InterruptedException e) {
            System.out.println("Reloj detenido.");
        }
    }
}

public class RelojApp {
    public static void main(String[] args) throws InterruptedException {
        Thread reloj = new Thread(new Reloj());
        reloj.start();

        for (int i = 0; i < 5; i++) {
            System.out.println("Hilo principal trabajando: " + i);
            Thread.sleep(2000);
        }
    }
}

```
Un hilo imprime la hora cada segundo, mientras el `main` imprime un contador cada 2 segundos.

---
### Ejemplo 2: Simulación de descargas

```java title="Descargas.java" showLineNumbers
class Descarga implements Runnable {
    private final String archivo;

    public Descarga(String archivo) {
        this.archivo = archivo;
    }

    public void run() {
        System.out.println("Iniciando descarga de: " + archivo);
        try {
            Thread.sleep(3000); // simula descarga
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Descarga completada: " + archivo);
    }
}

public class GestorDescargas {
    public static void main(String[] args) {
        String[] archivos = {"video.mp4", "musica.mp3", "documento.pdf"};

        for (String archivo : archivos) {
            Thread hilo = new Thread(new Descarga(archivo));
            hilo.start();
        }

        System.out.println("Gestor de descargas en ejecución...");
    }
}

```
Cada archivo se descarga en paralelo. El tiempo total es mucho menor que si fueran secuenciales.

---
### Ejemplo 3: Simulación de cajeros automáticos

```java title="Cajeros.java" showLineNumbers
class Cajero implements Runnable {
    private final int id;
    private final String cliente;

    public Cajero(int id, String cliente) {
        this.id = id;
        this.cliente = cliente;
    }

    public void run() {
        System.out.println("Cajero " + id + " atendiendo a " + cliente);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Cajero " + id + " terminó con " + cliente);
    }
}

public class BancoSimulado {
    public static void main(String[] args) {
        Thread t1 = new Thread(new Cajero(1, "Juan"));
        Thread t2 = new Thread(new Cajero(2, "María"));
        Thread t3 = new Thread(new Cajero(3, "Carlos"));

        t1.start();
        t2.start();
        t3.start();

        System.out.println("Banco atendiendo clientes...");
    }
}

```
Los tres cajeros trabajan al mismo tiempo, reduciendo el tiempo total de atención.


## Conclusión

Los hilos son la base de la **programación concurrente en Java**. Antes de usar herramientas más avanzadas, es fundamental entender:

* Qué son.
* Cómo crearlos con `Thread` y `Runnable`.
* Qué beneficios ofrecen.

En los siguientes temas veremos cómo simplificar el manejo de hilos con utilidades como **ExecutorService**, **Callable** y **Future**.

## Repositorio con ejemplos
https://github.com/arlemorales23/hilos

