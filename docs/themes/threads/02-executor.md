---
siderbar_position: 2
---

# Executor

En el tema anterior aprendimos a crear hilos usando `Thread` y `Runnable`. Sin embargo, cuando los programas empiezan a crecer, **crear y manejar hilos manualmente se vuelve complicado**. Aquí es donde entra en juego **ExecutorService**, una herramienta que simplifica y organiza la ejecución de tareas concurrentes.

---

## ¿Qué es un Executor?

Un **Executor** es un mecanismo que nos permite ejecutar tareas (código) en **hilos manejados automáticamente** por Java. En lugar de crear hilos manualmente, nosotros solo definimos la tarea, y el executor decide:

* Qué hilo usar.
* Cuándo ejecutarla.
* Si debe reutilizar un hilo ya existente.

Esto ahorra recursos y simplifica la vida del programador.

---

## ¿Por qué usar Executor?

1. **Eficiencia**: los hilos se reutilizan en un *pool* (grupo de hilos).
2. **Simplicidad**: no tienes que manejar directamente la creación y destrucción de hilos.
3. **Control**: puedes apagar el executor, cancelar tareas o programarlas.
4. **Escalabilidad**: ideal para aplicaciones grandes con muchas tareas concurrentes.

---

## Creación de un ExecutorService

La clase `Executors` provee métodos para crear diferentes tipos de ejecutores:

* `newSingleThreadExecutor()` → un solo hilo.
* `newFixedThreadPool(n)` → un conjunto fijo de hilos.
* `newCachedThreadPool()` → hilos ilimitados que se crean según necesidad.
* `newScheduledThreadPool(n)` → permite programar tareas con retraso o periódicas.

---

## Ejemplo 1: FixedThreadPool

Este tipo de executor mantiene un número fijo de hilos.

```java title="EjemploExecutor.java" showLineNumbers
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class EjemploExecutor {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        Runnable tarea1 = () -> System.out.println("Tarea 1 ejecutada por: " + Thread.currentThread().getName());
        Runnable tarea2 = () -> System.out.println("Tarea 2 ejecutada por: " + Thread.currentThread().getName());
        Runnable tarea3 = () -> System.out.println("Tarea 3 ejecutada por: " + Thread.currentThread().getName());

        executor.execute(tarea1);
        executor.execute(tarea2);
        executor.execute(tarea3);

        executor.shutdown();
    }
}
```

### Posible salida

```
Tarea 1 ejecutada por: pool-1-thread-1
Tarea 2 ejecutada por: pool-1-thread-2
Tarea 3 ejecutada por: pool-1-thread-1
```

Los hilos se **reutilizan** para ejecutar múltiples tareas.

---

## Ejemplo 2: SingleThreadExecutor

Este executor garantiza que todas las tareas se ejecuten en el mismo hilo y en orden.

```java title="SingleThreadExecutor.java" showLineNumbers
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SingleThreadExecutor {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        for (int i = 1; i <= 3; i++) {
            int finalI = i;
            executor.execute(() -> System.out.println("Tarea " + finalI + " ejecutada por: " + Thread.currentThread().getName()));
        }

        executor.shutdown();
    }
}
```

### Salida esperada

```
Tarea 1 ejecutada por: pool-1-thread-1
Tarea 2 ejecutada por: pool-1-thread-1
Tarea 3 ejecutada por: pool-1-thread-1
```

Siempre es el **mismo hilo**.

---

## Ejemplo 3: CachedThreadPool

Crea nuevos hilos según necesidad, y reutiliza los que quedan libres.

```java title="CachedThreadPool.java" showLineNumbers
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CachedThreadPool {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newCachedThreadPool();

        for (int i = 1; i <= 5; i++) {
            int finalI = i;
            executor.execute(() -> System.out.println("Tarea " + finalI + " ejecutada por: " + Thread.currentThread().getName()));
        }

        executor.shutdown();
    }
}
```

Ideal cuando hay muchas tareas cortas y rápidas.

---

## Caso práctico: Servidor de clientes

Imagina que un banco tiene un servidor que atiende clientes. Cada cliente se atiende en un hilo, pero para no saturar el sistema, se limita el número de hilos concurrentes.

```java title="ServidorBanco.java" showLineNumbers
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class Cliente implements Runnable {
    private final int id;

    public Cliente(int id) {
        this.id = id;
    }

    public void run() {
        System.out.println("Atendiendo cliente " + id + " en: " + Thread.currentThread().getName());
        try {
            Thread.sleep(2000); // Simula tiempo de atención
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("Cliente " + id + " atendido.");
    }
}

public class ServidorBanco {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        for (int i = 1; i <= 10; i++) {
            executor.execute(new Cliente(i));
        }

        executor.shutdown();
    }
}
```

### Posible salida

```
Atendiendo cliente 1 en: pool-1-thread-1
Atendiendo cliente 2 en: pool-1-thread-2
Atendiendo cliente 3 en: pool-1-thread-3
Cliente 1 atendido.
Cliente 2 atendido.
Cliente 3 atendido.
Atendiendo cliente 4 en: pool-1-thread-1
...
```

El servidor atiende **hasta 3 clientes en paralelo**.

---

## Conclusión

* Los **Executors** permiten manejar hilos de forma ordenada y eficiente.
* Evitan tener que crear y destruir hilos manualmente.
* Permiten controlar la concurrencia en aplicaciones reales.
* Son la base para tareas más avanzadas con **Callable** y **Future**.
