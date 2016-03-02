# frontend-maven-build
An example AngularJS multi app front end build with Gulp and Maven using [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin).

## More details
The project is using Maven to build the Java code and Gulp to build the multi app AngularJS front end.

It's two kinds of dependencies: tools and application code. The tools are used to manage and test the application.
* Tools are handeled by npm with dependencies defined in package.json
* Application are handeled by bower with dependencies defined in bower.json

npm is configured to automatically run bower. So after `npm install` is finished it will run `bower install`.

## Run the application
To run the application you need
* [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Maven](http://maven.apache.org/)

You can run the application with `mvn spring-boot:run` or you can build the JAR file with
`mvn clean package` and run the JAR with `java -jar target/frontend-maven-build-0.0.1-SNAPSHOT.jar`

What happens next is:
* Maven will resolve all dependencies and install node and npm local to the project
* Then it will run `npm install` followed by `bower install` and `gulp` (the default task)
* And lastly start the Spring Boot application

To see the application visit http://localhost:8080

## Maven plugins
* [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin)
* [Exec Maven Plugin](http://www.mojohaus.org/exec-maven-plugin/)

It's the frontend-maven-plugin which is used in the example. I only added Exec Maven Plugin since I
couldn'tfigure out how to make the JS test from stop hanging during build. This was later solved.
The configuration of Exec Maven Plugin is kept as it may be a better option to be used on a CI server
since it don't require access to the Internet to download node and npm or any dependencies.

### frontend-maven-plugin
frontend-maven-plugin installs node and npm local to the project.

Notice the hack in the karmaConfPath element where `--single-run` is added to avoid the Karma execution
from hanging on the JS tests during build.

```xml
<plugin>
    <groupId>com.github.eirslett</groupId>
    <artifactId>frontend-maven-plugin</artifactId>
    <version>0.0.28</version>
    <executions>
        <execution>
            <id>install node and npm</id>
            <goals>
                <goal>install-node-and-npm</goal>
            </goals>
            <configuration>
                <nodeVersion>v5.6.0</nodeVersion>
                <npmVersion>3.6.0</npmVersion>
            </configuration>
        </execution>
        <execution>
            <id>npm install</id>
            <goals>
                <goal>npm</goal>
            </goals>
        </execution>
        <execution>
            <id>gulp build</id>
            <goals>
                <goal>gulp</goal>
            </goals>
        </execution>
        <execution>
            <id>javascript tests</id>
            <goals>
                <goal>karma</goal>
            </goals>
            <configuration>
                <karmaConfPath>karma.conf.js --single-run</karmaConfPath>
            </configuration>
        </execution>
    </executions>
</plugin>
```

### Exec Maven Plugin
Exec Maven Plugin uses the globally installed programs.

```xml
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>exec-maven-plugin</artifactId>
    <version>1.4.0</version>
    <executions>
        <execution>
            <id>exec-npm-install</id>
            <phase>generate-sources</phase>
            <goals>
                <goal>exec</goal>
            </goals>
            <configuration>
                <executable>npm</executable>
                <arguments>install</arguments>
            </configuration>
        </execution>
        <execution>
            <id>exec-gulp</id>
            <phase>generate-sources</phase>
            <goals>
                <goal>exec</goal>
            </goals>
            <configuration>
                <executable>gulp</executable>
            </configuration>
        </execution>
        <execution>
            <id>exec-javascript-tests</id>
            <phase>test</phase>
            <goals>
                <goal>exec</goal>
            </goals>
            <configuration>
                <executable>karma</executable>
                <arguments>
                    <argument>start</argument>
                    <argument>karma.conf.js</argument>
                    <argument>--single-run</argument>
                </arguments>
            </configuration>
        </execution>
    </executions>
</plugin>
```