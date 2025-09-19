---
siderbar_position: 3
---

# Callable

Hasta ahora hemos visto cómo ejecutar tareas con `Runnable` y `ExecutorService`. Sin embargo, `Runnable` tiene una limitación importante: **no puede devolver resultados ni lanzar excepciones**. Para resolver esto, Java introduce la interfaz **`Callable`**.

---

## ¿Qué es Callable?

* Es una **interfaz funcional** que representa una tarea que puede ejecutarse en un hilo.
* A diferencia de `Runnable`, el método principal `call()` **devuelve un valor**.
* Puede lanzar excepciones controladas.

Su definición es:

```java
public interface Callable<V> {
    V call() throws Exception;
}
```

Donde `V` es el tipo de dato que devuelve la tarea.

---

## Diferencias entre Runnable y Callable

| Característica    | Runnable | Callable |
| ----------------- | -------- | -------- |
| Método principal  | run()    | call()   |
| Retorna valor     | ❌ No     | ✅ Sí     |
| Lanza excepciones | ❌ No     | ✅ Sí     |

---

## Ejemplo 1: Suma con Callable

```java title="EjemploCallable.java" showLineNumbers
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

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

### Salida esperada

```
Resultado de la suma: 15
```

Aquí usamos `Callable` para calcular un valor y obtenerlo con `Future`.

---

## Ejemplo 2: Simulación de descarga de archivos

Cada descarga devuelve un mensaje cuando termina.

```java title="DescargaCallable.java" showLineNumbers
import java.util.concurrent.*;

class Descarga implements Callable<String> {
    private final String archivo;

    public Descarga(String archivo) {
        this.archivo = archivo;
    }

    @Override
    public String call() throws Exception {
        System.out.println("Descargando: " + archivo);
        Thread.sleep(2000); // simula tiempo de descarga
        return "Descarga completa: " + archivo;
    }
}

public class DescargaCallableApp {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        Future<String> f1 = executor.submit(new Descarga("video.mp4"));
        Future<String> f2 = executor.submit(new Descarga("musica.mp3"));
        Future<String> f3 = executor.submit(new Descarga("documento.pdf"));

        System.out.println(f1.get());
        System.out.println(f2.get());
        System.out.println(f3.get());

        executor.shutdown();
    }
}
```

### Posible salida

```
Descargando: video.mp4
Descargando: musica.mp3
Descargando: documento.pdf
Descarga completa: video.mp4
Descarga completa: musica.mp3
Descarga completa: documento.pdf
```

Cada tarea devuelve un mensaje cuando se completa.

---

## Ejemplo 3: Cálculos en paralelo

Supongamos que queremos calcular cuadrados de varios números al mismo tiempo.

```java title="CalculoCallable.java" showLineNumbers
import java.util.concurrent.*;
import java.util.*;

public class CalculoCallable {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(4);

        List<Callable<Integer>> tareas = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            int num = i;
            tareas.add(() -> num * num);
        }

        List<Future<Integer>> resultados = executor.invokeAll(tareas);

        for (Future<Integer> f : resultados) {
            System.out.println("Resultado: " + f.get());
        }

        executor.shutdown();
    }
}
```

### Salida esperada

```
Resultado: 1
Resultado: 4
Resultado: 9
Resultado: 16
Resultado: 25
```

Con `invokeAll`, ejecutamos múltiples `Callable` y recogemos todos los resultados.

---

## Caso práctico: Procesamiento de pedidos

Imagina un sistema de compras donde cada pedido se procesa y devuelve una confirmación.

```java title="ProcesadorPedidos.java" showLineNumbers
import java.util.concurrent.*;

class Pedido implements Callable<String> {
    private final int id;

    public Pedido(int id) {
        this.id = id;
    }

    @Override
    public String call() throws Exception {
        System.out.println("Procesando pedido " + id);
        Thread.sleep(1500); // Simula tiempo de procesamiento
        return "Pedido " + id + " completado";
    }
}

public class ProcesadorPedidos {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        Future<String> p1 = executor.submit(new Pedido(101));
        Future<String> p2 = executor.submit(new Pedido(102));
        Future<String> p3 = executor.submit(new Pedido(103));

        System.out.println(p1.get());
        System.out.println(p2.get());
        System.out.println(p3.get());

        executor.shutdown();
    }
}
```

### Posible salida

```
Procesando pedido 101
Procesando pedido 102
Procesando pedido 103
Pedido 101 completado
Pedido 102 completado
Pedido 103 completado
```

Cada pedido se procesa en paralelo y devuelve un resultado.

---

## Conclusión

* `Callable` amplía las capacidades de `Runnable` al permitir **retornar valores y manejar excepciones**.
* Trabaja en conjunto con `ExecutorService` y `Future`.
* Es muy útil en escenarios donde necesitas **recibir resultados** de tareas concurrentes.
* Casos prácticos: descargas, cálculos matemáticos, procesamiento de pedidos, simulaciones, etc.
