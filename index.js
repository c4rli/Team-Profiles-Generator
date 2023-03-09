const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// object containing all of the profile questions for team members
const teamProfileQuestions = {
    profileQuestions: [
        {
            name: "employeeName",
            type: "input",
            message: "Employee Name:"
        },
        {
            name: "employeeID",
            type: "input",
            message: "Employee ID:"
        },
        {
            name: "employeeEmail",
            type: "input",
            message: "Employee Email Address:"
        }
    ],
    specialQuestions: {
        manager: [{
            name: "managerOffice",
            type: "input",
            message: "Office Number:"
        }],
        engineer: [{
            name: "engineerGithub",
            type: "input",
            message: "Github Username:"
        }],
        intern: [{
            name: "internSchool",
            type: "input",
            message: "School:"
        }]
    },
    getQuestions(type) {
        return this.profileQuestions.concat(this.specialQuestions[type])
    }
}

// initialize array that will contain team member objects
const teamArray = [];

// menu options for navigating 
const menuOptions = ["Add Engineer", "Add Intern", "Finish Building Team"];

// displays the menu options after completing a team member profile
const promptForNextEmployee = () => {
    inquirer.prompt([{
        name: "promptNext",
        type: "list",
        message: "Select:",
        choices: menuOptions
    }]).then(response => {
        displayMenu(response);
    })
}

// switch case to handle which type of employee will be built with function
const displayMenu = (response) => {
    switch (response.promptNext) {
        case menuOptions[0]: promptForEmployee("engineer");
            break;
        case menuOptions[1]: promptForEmployee("intern");
            break;
        case menuOptions[2]: finishBuildingTeam();
            break;
    }
}

// get appropriate questions from teamProfileQuestions and display them
// pass response to createEmployee
const promptForEmployee = (type) => {
    console.log(`
Creating new ${type} profile:`);

    inquirer.prompt(
        teamProfileQuestions.getQuestions(type)

    ).then(response => {
        createEmployee(type, response);
        promptForNextEmployee();
    })
}

// creates employee object based on what type of employee questions were answered
function createEmployee(type, response) {
    let employee;

    if (type === "manager") {
        employee = new Manager(response.employeeName, response.employeeID, response.employeeEmail, response.managerOffice);
    }
    else if (type === "engineer") {
        employee = new Engineer(response.employeeName, response.employeeID, response.employeeEmail, response.engineerGithub);
    }
    else if (type === "intern") {
        employee = new Intern(response.employeeName, response.employeeID, response.employeeEmail, response.internSchool);
    }
    // add new employee to employees array
    teamArray.push(employee);
}

// check if OUTPUT_DIR exists and if not create it 
// Then save team profile html to ./output/team.html
function writeFile(html) {
    fs.access(OUTPUT_DIR, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdir(OUTPUT_DIR, (error) => {
                if (!error) {
                    console.log(`"/output" directory created successfully.`);
                }
            });
        }
        fs.writeFile(outputPath, html, (err) =>
            err ? console.error(err) : console.log(`Team Profile saved as "team.html" in "/output"`));
    });
}

const buildPage = () => {
    return render(teamArray);
}

function finishBuildingTeam() {
    writeFile(buildPage());
}

// welcome message
function displayWelcome() {
    console.log(`
~~~ Welcome to c4rli's Team Profile Generator ~~~

Enter the employee details as prompted, use [enter] to save a value.
The generated .html containing your team cards file will be saved in "/output".
To begin the team must have a manager, please enter the Team Manager's information.`);
}

// start application
function appStart() {
    displayWelcome();
    promptForEmployee("manager");
}

appStart();
