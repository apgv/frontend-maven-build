# frontend-maven-build
An example AngularJS multi app front end build with Gulp and Maven using
* [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) on localhost and
* [Exec Maven Plugin](http://www.mojohaus.org/exec-maven-plugin/) on CI server

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

## Run tests
To run the test you need
* [PhantomJS](http://phantomjs.org/) (headless testing)

This is in addition to the requirements needed to run the application.

* To run JS tests with Chrome `mvn clean test -P localhost`
* To run JS tests with PhantomJS `mvn clean test -P ci-server`

This also runs the Java tests.

## Maven plugins
* [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) run local JS tests with the Maven profile `localhost`
* [Exec Maven Plugin](http://www.mojohaus.org/exec-maven-plugin/) run JS tests with the Maven profile `ci-server`

The build is split into a local build running JS tests with Chrome and CI server build running JS tests
using PhantomJS for headless JS testing.

Profiles can be explicitly specified using the -P CLI option as shown above. The profiles can more easily
be activated by adding the environment variable `BUILD_ENVIRONMENT` with value of `localhost` or `ci-server`.
Note that the name of the environment variable and it's values are only suggestions.

### Why two different Maven plugins?
Both plugins have pro and cons.

__frontend-maven-plugin__
* __Pro:__ This plugin only needs Internet access. It downloads and installs node and npm if not already installed as part of the build.
* __Con:__ It needs Internet access to download and install node and npm. This is often not desired on a CI server.

__Exec Maven Plugin__
* __Pro:__ Don't need Internet access to download any dependencies. You're in full control.
* __Con:__ Needs node, npm and other dependencies to be installed or available. More setup for the developer.

A possible solution for both plugins can be to commit the folders node, node_modules and bower_components to VCS.
I don't know if I would recommend doing this unless absolutely necessary.

### frontend-maven-plugin
frontend-maven-plugin installs node and npm local to the project.

Notice the hack in the karmaConfPath element where `--single-run` is added to avoid the Karma execution
from hanging on the JS tests during build. I don't want to set `singleRun: true` in karma.conf.js file
as I normally run the tests from my IDE.

```xml
<profiles>
    <profile>
        <id>localhost</id>
        <activation>
            <property>
                <name>env.BUILD_ENVIRONMENT</name>
                <value>localhost</value>
            </property>
        </activation>
        <build>
            <plugins>
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
            </plugins>
        </build>
    </profile>
    ...
</profiles>
```

### Exec Maven Plugin
Exec Maven Plugin uses the globally installed programs.

```xml
<profiles>
    ...
    <profile>
        <id>ci-server</id>
        <activation>
            <property>
                <name>env.BUILD_ENVIRONMENT</name>
                <value>ci-server</value>
            </property>
        </activation>
        <build>
            <plugins>
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
                                    <argument>karma.conf.ci.js</argument>
                                    <argument>--single-run</argument>
                                </arguments>
                            </configuration>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
    </profile>
</profiles>
```