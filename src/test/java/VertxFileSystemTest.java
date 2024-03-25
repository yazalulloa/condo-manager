import io.vertx.rxjava3.core.Vertx;
import io.vertx.rxjava3.core.buffer.Buffer;
import io.vertx.rxjava3.core.file.FileSystem;
import java.nio.file.Files;
import java.security.SecureRandom;
import java.util.Random;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
public class VertxFileSystemTest {
  public static final char[] ALPHANUMERIC = "abcdefghjkmnpqrstuvwxyzABCDEFGHIJKMNPQRSTUVWXYZ0123456789".toCharArray();
  @Test
  public void test() {
    final var vertx = Vertx.vertx();
    final var secureRandom = new SecureRandom();

    final var fileSystem = vertx.fileSystem();

    final var filePath = "tmp/test.txt";


    final var data = generate(secureRandom, 1300, ALPHANUMERIC);

    final var string = fileSystem.deleteRecursive(filePath, true)
        .andThen(fileSystem.writeFile(filePath, Buffer.buffer(data)))
        .andThen(fileSystem.exists(filePath))
        .doOnSuccess(aBoolean -> log.info("Vertx File exists {}", aBoolean))
        .ignoreElement()
        .andThen(fileSystem.readFile(filePath))
        .blockingGet()
        .toString();

    System.out.println(data);
    System.out.println(string);
    assert data.equals(string);
  }
  public static String generate(Random random, int length, char[] array) {
    final var sb = new StringBuilder();
    for (int i = 0; i < length; i++) {
      char c = array[random.nextInt(array.length)];
      sb.append(c);
    }
    return sb.toString();
  }
}
