package edu.eci.selfdeployment.mypaas.model;

import edu.eci.selfdeployment.mypaas.utils.CopyFiles;
import edu.eci.selfdeployment.mypaas.utils.UpdateFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Application {
    private String AppName;
    private String gitRepo;
    private String mainClass;
    private String url;
    private String port;

    public Application(String appName, String gitRepo, String mainClass, String port) {
        AppName = appName;
        this.gitRepo = gitRepo;
        this.mainClass = mainClass;
        this.port = port;
    }

    public void deployApp(String port) throws IOException, InterruptedException {
        setPort(port);
        setUrl("http://54.209.201.116:"+port);
        System.out.println(port + "aaaaa");
        UpdateFile.addServices(getGitRepo(), getMainClass(), getAppName(), getPort());
        createDirectory();
        Thread.sleep(5000);
        execDockerCompose();
    }

    private void execDockerCompose() throws IOException {
        Process process = Runtime.getRuntime().exec("sudo docker-compose up -d");
        printResults(process);

    }

    private void createDirectory() throws IOException {
        Path path = Paths.get("Apps/" + this.AppName);
        try {
            Files.createDirectories(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        CopyFiles.copy("src/main/resources/Dockerfile", "Apps/" + this.AppName + "/Dockerfile");
    }

    public static void printResults(Process process) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line = "";
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
    }

    public String getAppName() {
        return AppName;
    }

    public void setAppName(String appName) {
        AppName = appName;
    }

    public String getGitRepo() {
        return gitRepo;
    }

    public void setGitRepo(String gitRepo) {
        this.gitRepo = gitRepo;
    }

    public String getMainClass() {
        return mainClass;
    }

    public void setMainClass(String mainClass) {
        this.mainClass = mainClass;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    @Override
    public String toString() {
        return "Application{" +
                "AppName='" + AppName + '\'' +
                ", gitRepo='" + gitRepo + '\'' +
                ", mainClass='" + mainClass + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
