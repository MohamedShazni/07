// import the java libraries
import java.util.*;
import java.io.*;

public class Task1 {
    // Defining the constants and variables
    private static final int Max_Students = 100;// Maximum number of students you can register
    private static String[][] studentDetails = new String[Max_Students][2]; // 0: ID, 1: Name
    private static int studentCount = 0;// Initialize for the studentcounts
    private static Scanner input = new Scanner(System.in);// Scanner object for user inputs

    public static void main(String[] args) {
        while (true) {
            
            //Displaying the menu of System
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
            System.out.println("8. Exit");
            System.out.print("Enter your choice(between 1 - 8): ");

            int option = input.nextInt();
            input.nextLine(); // It will consume the new  character

            switch (option) {
                case 1:
                    CheckAvailableSeats();
                    break;
                case 2:
                    RegisterStudent();
                    break;
                case 3:
                    DeleteStudent();
                    break;
                case 4:
                    FindStudent();
                    break;
                case 5:
                    StoreStudentDetails();
                    break;
                case 6:
                    LoadStudentDetails();
                    break;
                case 7:
                    ViewStudentList();
                    break;
                case 8:
                    System.out.println("Exiting... Bye Bye");
                    return; // Exit the program
                default:
                    System.out.println("Sorry invalid option. Please try again!!!");
            }
        }
    }
    // Method to check available seats
    static void CheckAvailableSeats() {
        int AvailableSeats = Max_Students - studentCount;
        System.out.println("We have only " + AvailableSeats + " seats.");
    }
    
    // Method to register a student
    static void RegisterStudent() {
        // Get the student details from the user
        if (studentCount < Max_Students) {
            System.out.println("Enter the student name: ");
            String name = input.nextLine();
            System.out.println("Enter student ID (8 characters, e.g.: w1234567): ");
            String id = input.nextLine();
            
            // Validate the student ID format as UOW
            if (id.length() != 8 || !id.matches("w\\d{7}")) {
                System.out.println("Error: Incorrect student ID format!!!");
                return;
            }
            
            // Checking the ID if already registered or not
            for (int i = 0; i < studentCount; i++) {
                if (studentDetails[i][0].equals(id)) {
                    System.out.println("Error: Student with this ID already registered.");
                    return;
                }
            }
            
            // Registering a student with id and name 
            studentDetails[studentCount][0] = id;
            studentDetails[studentCount][1] = name;
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
            if (studentDetails[i][0].equals(id)) {
                studentDetails[i] = studentDetails[--studentCount];
                studentDetails[studentCount] = null;
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
            if (studentDetails[i][0].equals(id)) {
                System.out.println("This is " + studentDetails[i][1]);
                return;
            }
        }
        System.out.println("Student not found.");
    }
    
    // Method to store the student details
    static void StoreStudentDetails() {
        try (PrintWriter writer = new PrintWriter(new FileWriter("students.txt"))) {
            for (int i = 0; i < studentCount; i++) {
                writer.println(studentDetails[i][0] + "," + studentDetails[i][1]);
            }
            System.out.println("Student details stored successfully.");
        } catch (IOException e) {
            System.out.println("Error storing the student details: " + e.getMessage());
        }
    }
    
    // Method to load the details that you have stored
    static void LoadStudentDetails() {
        try (Scanner fileInput = new Scanner(new File("students.txt"))) {
            studentCount = 0;
            while (fileInput.hasNextLine() && studentCount < Max_Students) {
                String line = fileInput.nextLine();
                String[] parts = line.split(","); // Assuming the file format is "id,name"
                if (parts.length == 2) {
                    studentDetails[studentCount][0] = parts[0].trim();
                    studentDetails[studentCount][1] = parts[1].trim();
                    studentCount++;
                }
            }
            System.out.println("Student details loaded successfully.");
        } catch (FileNotFoundException e) {
            System.out.println("Error loading student details: " + e.getMessage());
        }
    }
    
    // Method to view the student details
    static void ViewStudentList() {
        System.out.println("Student List:");
        for (int i = 0; i < studentCount; i++) {
            System.out.println("Name: " + studentDetails[i][1] + " Id: " + studentDetails[i][0]);
        }
    }
}
