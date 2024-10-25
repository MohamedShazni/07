// Import the neccessary java libraries

import java.util.*;
import java.io.*;

// student class representing the student details
class Student implements Serializable {
    String id;
    String name;
    int module1Marks;
    int module2Marks;
    int module3Marks;
    double averageMarks;
    String grade;

    // Initialize to student id and the name
    public Student(String id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getter for student id
    public String getId() {
        return id;
    }

    // Getter for student name
    public String getName() {
        return name;
    }

    // Setter for student name
    public void setName(String name) {
        this.name = name;
    }

    // setter for Module 1 marks
    public void setModule1Marks(int marks) {
        this.module1Marks = marks;
    }

    // setter for Module 2 marks
    public void setModule2Marks(int marks) {
        this.module2Marks = marks;
    }

    // setter for Module 3 marks
    public void setModule3Marks(int marks) {
        this.module3Marks = marks;
    }

    // Getter for average marks
    public double getAverageMarks() {
        return averageMarks;
    }

    // Method to calculate the grade
    public void calculateGrade() {
        averageMarks = (module1Marks + module2Marks + module3Marks) / 3.0;
        if (averageMarks >= 80) {
            grade = "Distinction";
        } else if (averageMarks >= 70) {
            grade = "Merit";
        } else if (averageMarks >= 40) {
            grade = "Pass";
        } else {
            grade = "Fail";
        }
    }

    // Override toString method to display student the details
    @Override
    public String toString() {
        return String.format(
                "Student ID: %s, Name: %s, Module 1 Marks: %d, Module 2 Marks: %d, Module 3 Marks: %d",
                id, name, module1Marks, module2Marks, module3Marks);
    }
}

public class Task3 {
    // Defining the constants and variables
    private static final int Max_Students = 100; // Maximum number of students you can register
    private static int studentCount = 0; // Current number of registered students
    private static Student[] students = new Student[Max_Students]; // Array to store students
    private static Scanner input = new Scanner(System.in); // Scanner for input

    // Main method - entry point of the program
    public static void main(String[] args) {
        while (true) {
            // Displaying the menu of System
            System.out.println(" ");
            System.out.println("       " + "Hello! Welcome to");
            System.out.println("***Student Management System***");
            System.out.println(" ");
            System.out.println("1. Check available seats");
            System.out.println("2. Register the student(with ID)");
            System.out.println("3. Delete student");
            System.out.println("4. Find students(with student ID)");
            System.out.println("5. Store students details");
            System.out.println("6. Load students details");
            System.out.println("7. View students list");
            System.out.println("8. Additional options");
            System.out.println("0. Exit");
            System.out.print("Enter your choice(between 1 - 8 or 0): ");

            String option = input.nextLine(); // Reading the option from user

            switch (option.toUpperCase()) {
                case "1":
                    CheckAvailableSeats();
                    break;
                case "2":
                    RegisterStudent();
                    break;
                case "3":
                    DeleteStudent();
                    break;
                case "4":
                    FindStudent();
                    break;
                case "5":
                    StoreStudentDetails();
                    break;
                case "6":
                    LoadStudentDetails();
                    break;
                case "7":
                    ViewStudentList();
                    break;
                case "8":
                    AdditionalOptions();
                    break;
                case "0":
                    System.out.println("Exiting... Bye Bye");
                    return; // Exit the program
                default:
                    System.out.println("Sorry invalid option. Please try again!!!");
            }
        }
    }

    // Method to check available seats
    static void CheckAvailableSeats() {
        int availableSeats = Max_Students - studentCount;
        System.out.println("We have only " + availableSeats + " seats.");
    }

    // Method to register a student
    static void RegisterStudent() {
        if (studentCount < Max_Students) {
            System.out.println("Enter the student name: ");
            String name = input.nextLine();
            System.out.println("Enter student ID (8 characters, e.g.: w1234567): ");
            String id = input.nextLine(); // It will consume the new line character

            // Validate the student ID format as UOW
            if (id.length() != 8 || !id.matches("w\\d{7}")) {
                System.out.println("Error: Incorrect student ID format!!!");
                return;
            }

            // Checking if the ID is already registered
            for (int i = 0; i < studentCount; i++) {
                if (students[i].getId().equals(id)) {
                    System.out.println("Error: Student with this ID already registered.");
                    return;
                }
            }

            // Registering a student with id and name
            students[studentCount] = new Student(id, name);
            studentCount++;
            System.out.println("Student is registered successfully.");
        } else {
            System.out.println("Sorry!!! no more seats to register.");
        }
    }

    // Method to delete a student
    static void DeleteStudent() {
        System.out.println("Enter the student ID to delete: ");
        String id = input.nextLine();

        for (int i = 0; i < studentCount; i++) {
            if (students[i].getId().equals(id)) {
                students[i] = students[--studentCount];
                students[studentCount] = null;
                System.out.println("Student removed successfully.");
                return;
            }
        }
        System.out.println("Student not found!!!");
    }

    // Method to find a student
    static void FindStudent() {
        System.out.print("Enter the student ID to find: ");
        String id = input.nextLine();
        for (int i = 0; i < studentCount; i++) {
            if (students[i].getId().equals(id)) {
                System.out.println("This is " + students[i].getName());
                return;
            }
        }
        System.out.println("Student not found.");
    }

    // Method to store the student details
    static void StoreStudentDetails() {
        try (PrintWriter writer = new PrintWriter(new FileWriter("students.txt"))) {
            for (int i = 0; i < studentCount; i++) {
                writer.println(students[i].getId() + "," +
                        students[i].getName() + "," +
                        students[i].module1Marks + "," +
                        students[i].module2Marks + "," +
                        students[i].module3Marks);
            }
            System.out.println("Student details stored successfully.");
        } catch (IOException e) {
            System.out.println("Error storing the student details: " + e.getMessage());
        }
    }

    // Method to load the details that you have stored

    static void LoadStudentDetails() {
        try (BufferedReader reader = new BufferedReader(new FileReader("students.txt"))) {
            String line;
            studentCount = 0;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(","); // Splitting based on your stored format

                // Extracting student details from parts
                String id = parts[0].trim();
                String name = parts[1].trim();
                int module1Marks = Integer.parseInt(parts[2].trim());
                int module2Marks = Integer.parseInt(parts[3].trim());
                int module3Marks = Integer.parseInt(parts[4].trim());

                // Create new Student object
                Student student = new Student(id, name);
                student.setModule1Marks(module1Marks);
                student.setModule2Marks(module2Marks);
                student.setModule3Marks(module3Marks);

                // Add student to array
                students[studentCount++] = student;
            }
            System.out.println("Student details loaded successfully.");
        } catch (IOException e) {
            System.out.println("Error loading student details: " + e.getMessage());
        }
    }

    // Method to view the student details
    static void ViewStudentList() {
        System.out.println("Student List:");
        for (int i = 0; i < studentCount; i++) {
            System.out.println(students[i]);
        }
    }

    // Placeholder for additional options
    static void AdditionalOptions() {
        while (true) {
            System.out.println("a. Add student name");
            System.out.println("b. Set module marks");
            System.out.println("c. Generate system summary");
            System.out.println("d. Generate complete report");
            System.out.println("q. Back to main menu");
            System.out.print("Enter your choice to update : ");
            System.out.println(" ");

            String option = input.next();
            input.nextLine(); // It will consume the new line character

            switch (option) {
                case "a":
                    AddStudentName();
                    break;

                case "b":
                    SetModuleMarks();
                    break;

                case "c":
                    GenerateSystemSummary();
                    break;

                case "d":
                    GenerateCompleteReport();
                    break;

                case "q":
                    System.out.println("Back to main menu!!!");
                    return;

                default:
                    System.out.println("Sorry invalid option. Please try again!!!");
            }
        }
    }

    // Method to add student name
    static void AddStudentName() {
        System.out.print("Enter the student ID: ");
        String id = input.nextLine();
        for (int i = 0; i < studentCount; i++) {
            if (students[i].getId().equals(id)) {
                System.out.print("Enter the new name: ");
                String name = input.nextLine();
                students[i].setName(name);
                System.out.println("Student name has updated successfully.");
                return;
            }
        }
        System.out.println("Student not found.");
    }

    // Method to set module marks
    static void SetModuleMarks() {
        while (true) {
            System.out.println("1. Set Module 1 Marks");
            System.out.println("2. Set Module 2 Marks");
            System.out.println("3. Set Module 3 Marks");
            System.out.println("0. Return to Additional Options Menu");
            System.out.print("Enter your choice: ");

            int option = input.nextInt();
            input.nextLine(); // It will consume the new line character

            switch (option) {
                case 1:
                    SetModuleMarks1();
                    break;
                case 2:
                    SetModuleMarks2();
                    break;
                case 3:
                    SetModuleMarks3();
                    break;
                case 0:
                    System.out.println("Return to Additional options menu");
                    return;
                default:
                    System.out.println("Sorry invalid option. Please try again!!!");
            }
        }
    }

    // Method to set Module 1 marks
    static void SetModuleMarks1() {
        System.out.print("Enter the student ID: ");
        String id = input.nextLine();
        for (int i = 0; i < studentCount; i++) {
            if (students[i].getId().equals(id)) {
                System.out.print("Enter Module 1 Marks: ");
                int marks = input.nextInt();
                input.nextLine(); // It will consume the new line character
                students[i].setModule1Marks(marks);
                System.out.println("Module 1 Marks has been updated successfully.");
                return;
            }
        }
        System.out.println("Student not found.");
    }

    // Method to set Module 2 marks
    static void SetModuleMarks2() {
        System.out.print("Enter the student ID: ");
        String id = input.nextLine();
        for (int i = 0; i < studentCount; i++) {
            if (students[i].getId().equals(id)) {
                System.out.print("Enter Module 2 Marks: ");
                int marks = input.nextInt();
                input.nextLine(); // It will consume the new line character
                students[i].setModule2Marks(marks);
                System.out.println("Module 2 Marks has been updated successfully.");
                return;
            }
        }
        System.out.println("Student not found.");
    }

    // Method to set Module 3 marks
    static void SetModuleMarks3() {
        System.out.print("Enter the student ID: ");
        String id = input.nextLine(); // It will consume the new line character
        for (int i = 0; i < studentCount; i++) {
            if (students[i].getId().equals(id)) {
                System.out.print("Enter Module 3 Marks: ");
                int marks = input.nextInt();
                input.nextLine(); // It will consume the new line character
                students[i].setModule3Marks(marks);
                System.out.println("Module 3 Marks has been updated successfully.");
                return;
            }
        }
        System.out.println("Student not found.");
    }

    // Method to generate this system summary
    static void GenerateSystemSummary() {
        int TotalRegistrations = studentCount;
        int Module1MarksAbove40 = 0, Module2MarksAbove40 = 0, Module3MarksAbove40 = 0;

        for (int i = 0; i < studentCount; i++) {
            if (students[i].module1Marks > 40) {
                Module1MarksAbove40++;
            }
            if (students[i].module2Marks > 40) {
                Module2MarksAbove40++;
            }
            if (students[i].module3Marks > 40) {
                Module3MarksAbove40++;
            }
        }

        // Displaying student management system summary
        System.out.println("Student Mangement System Summary:");
        System.out.println("There are  " + TotalRegistrations + "  students registered.");
        System.out.println("There are  " + Module1MarksAbove40 + "  students scored more than 40 marks in module 1.");
        System.out.println("There are  " + Module2MarksAbove40 + "  students scored more than 40 marks in module 2.");
        System.out.println("There are  " + Module3MarksAbove40 + "  students scored more than 40 marks in module 3.");
    }

    // Method to generate the complete report
    static void GenerateCompleteReport() {
        System.out.println("Here is the complete Student Report:");
        System.out.println("------------------------------------------------");
        for (int i = 0; i < studentCount; i++) {
            Student student = students[i];
            student.calculateGrade(); // Calculate grade if not already calculated

            int totalMarks = student.module1Marks + student.module2Marks + student.module3Marks;
            double averageMarks = student.getAverageMarks();
            String grade = student.grade;

            // Displaying student details and calculated information
            System.out.println("Student ID: " + student.getId());
            System.out.println("Student Name: " + student.getName());
            System.out.println("Module 1 Marks: " + student.module1Marks);
            System.out.println("Module 2 Marks: " + student.module2Marks);
            System.out.println("Module 3 Marks: " + student.module3Marks);
            System.out.println("Total Marks: " + totalMarks);
            System.out.println("Average Marks: " + averageMarks);
            System.out.println("Your Grade: " + grade);
            System.out.println("----------------------------------------------");
        }
    }
}
