---

sidebar_position: 1
---

# Hilos (Threads)

En este tema estudiaremos el manejo de **hilos** en Java utilizando las utilidades más modernas de concurrencia: `ExecutorService`, `Callable` y `Future`. Estas clases e interfaces permiten trabajar con programación asíncrona de manera más sencilla y estructurada que creando y controlando hilos manualmente.

---

## Executor

Un **Executor** en Java es una clase que se utiliza para ejecutar tareas de manera asíncrona en hilos de ejecución. Permite al desarrollador definir una tarea y pasarla al *executor* para su ejecución, evitando la necesidad de administrar manualmente los hilos.

La clase principal es **`ExecutorService`**, que provee métodos como:

* `submit()` → envía una tarea para ser ejecutada y devuelve un objeto `Future`.
* `shutdown()` → apaga el executor de manera ordenada.

### Ejemplo básico con ExecutorService

```java title="EjemploExecutor.java" showLineNumbers
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class EjemploExecutor {
    public static void main(String[] args) {
        // Crear un pool con 2 hilos
        ExecutorService executor = Executors.newFixedThreadPool(2);

        // Ejecutar tareas con submit()
        executor.submit(() -> System.out.println("Tarea 1 ejecutada por: " + Thread.currentThread().getName()));
        executor.submit(() -> System.out.println("Tarea 2 ejecutada por: " + Thread.currentThread().getName()));

        // Apagar el executor
        executor.shutdown();
    }
}
```

---

## Callable

La interfaz **`Callable`** es similar a `Runnable`, pero con una diferencia importante: puede **devolver un resultado** y lanzar excepciones.

* Método principal: `call()` → retorna un valor genérico `V`.
* Se utiliza junto con `ExecutorService`.

### Ejemplo con Callable

```java title="EjemploCallable.java" showLineNumbers
import java.util.concurrent.*;

public class EjemploCallable {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        Callable<Integer> tarea = () -> {
            int suma = 0;
            for (int i = 1; i <= 5; i++) {
                suma += i;
            }
            return suma;
        };

        Future<Integer> resultado = executor.submit(tarea);
        System.out.println("Resultado de la suma: " + resultado.get());

        executor.shutdown();
    }
}
```

---

## Future

Un objeto **`Future`** representa el resultado de una tarea asíncrona enviada a un `ExecutorService`. Permite:

* `get()` → obtener el resultado (bloquea hasta que esté disponible).
* `get(timeout, unit)` → obtener el resultado con límite de tiempo.
* `cancel()` → cancelar la ejecución.
* `isDone()` → verificar si la tarea terminó.

### Ejemplo con Future

```java title="EjemploFuture.java" showLineNumbers
import java.util.concurrent.*;

public class EjemploFuture {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(1);

        Callable<String> tarea = () -> {
            Thread.sleep(2000);
            return "Tarea completada";
        };

        Future<String> future = executor.submit(tarea);

        System.out.println("Esperando resultado...");
        if (!future.isDone()) {
            System.out.println("La tarea aún se está ejecutando...");
        }

        System.out.println("Resultado: " + future.get());

        executor.shutdown();
    }
}
```

---

## Conclusión

* **ExecutorService** simplifica la ejecución de tareas en paralelo.
* **Callable** permite tareas que devuelven valores.
* **Future** da control sobre el estado y resultado de las tareas.

Estas utilidades son la base para trabajar con concurrencia en Java de forma ordenada y escalable.

---

## Videos de apoyo

* [Thread en Java - Simplilearn](https://www.simplilearn.com/tutorials/java-tutorial/thread-in-java)
* [Java Threads - YouTube (BroCode)](https://www.youtube.com/watch?v=tQp-8fE8vY8&list=PLM4HZoZrNapu9XbnNJ1w9T6sLqvph8_Wg&index=96)
* [Java Callable y Future - YouTube](https://www.youtube.com/watch?v=KZ-qCKF21Z0)
* [ExecutorService en Java - YouTube](https://www.youtube.com/watch?v=DEzcSBBflfI)
