# frontend-maven-build
An example AngularJS multi app front end build with Gulp and Maven.

## More details
The project is using Maven to build the Java code and Gulp to build the multi app AngularJS front end.

It's two kinds of dependencies: tools and application code. The tools are used to manage and test the application.
* Tools are handeled by npm with dependencies defined in package.json
* Application are handeled by bower with dependencies defined in bower.json

npm is configured to automatically run bower. So `npm install` will run `bower install` behind the scenes.

## Run the application
To run the application you need
* [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Maven](http://maven.apache.org/)

You can run the application with `mvn spring-boot:run` or you can build the JAR file with
`mvn clean package` and run the JAR  with `java -jar target/frontend-maven-build-0.0.1-SNAPSHOT.jar`

What happens next is:
* Maven will resolve all dependencies and install node and npm local to the project
* Then it will run `npm install` followed by `bower install` and `gulp` (the default task)
* And lastly start the Spring Boot application

To see the application visit http://localhost:8080