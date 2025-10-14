import { ArgumentErrorHandling } from "./utils.js";

let tdCount = 0;
function Todo_Data(name) {
  this.name = name;
  this.id = `td[${tdCount++}]`;
  this.complete = false;
}

let ipCount = 0;
function InProgress_Data(name) {
  this.name = name;
  this.id = `ip[${ipCount++}]`;
  this.complete = false;
}

let dCount = 0;
function Done_Data(name) {
  this.name = name;
  this.id = `d[${dCount++}]`;
  this.complete = false;
}

let count = 0;

class Project {
  #id = undefined;
  name = "";
  date = new Date().toLocaleDateString("in");
  timestamp = new Date().getTime();
  kanban_table_data = {
    todo_data: [],
    inProgress_data: [],
    done_data: [],
    empty: true,
  };

  constructor(name) {
    ArgumentErrorHandling(
      "invalid argument passed on Project constructor",
      name
    );

    this.#id = `p[${count++}]`;
    this.name = name;
  }

  get Id() {
    return this.#id;
  }

  set Id(Id) {
    this.#id = Id;
  }

  createTaskOnTodoData(name) {
    ArgumentErrorHandling(
      "invalid argument passed on Project.createTaskOnTodoData method",
      name
    );

    const todo_data = new Todo_Data(name);
    this.kanban_table_data.todo_data.push(todo_data);
    return todo_data;
  }

  createTaskOnInProgressData(name) {
    ArgumentErrorHandling(
      "invalid argument passed on Project.createTaskOnInProgressData method",
      name
    );

    const inProgress_data = new InProgress_Data(name);
    this.kanban_table_data.inProgress_data.push(inProgress_data);
    return inProgress_data;
  }

  createTaskOnDoneData(name) {
    ArgumentErrorHandling(
      "invalid argument passed on Project.createTaskOnDoneData method",
      name
    );

    const done_data = new Done_Data(name);
    this.kanban_table_data.done_data.push(done_data);
    return done_data;
  }

  createNewTodoTaskElement(todoTask) {
    const { name, id } = todoTask;

    const todo_task_element = document.createElement("div");
    todo_task_element.setAttribute(
      "class",
      "kanban_board_col_items_tasks_task_container kanban_board_col_todo_tasks_task_container"
    );

    const todo_task_name_element = document.createElement("p");
    const todo_task_name_element_text = document.createTextNode(name);
    todo_task_name_element.setAttribute(
      "class",
      "kanban_board_col_todo_tasks_task"
    );
    todo_task_name_element.appendChild(todo_task_name_element_text);
    todo_task_element.appendChild(todo_task_name_element);

    const todo_task_btn_element = document.createElement("button");
    const todo_task_btn_element_text = document.createTextNode("delete");
    todo_task_btn_element.setAttribute(
      "class",
      "del_kanban_board_col_items_task del_kanban_board_col_todo_task"
    );
    todo_task_btn_element.setAttribute("id", id);
    todo_task_btn_element.appendChild(todo_task_btn_element_text);
    todo_task_element.appendChild(todo_task_btn_element);

    return todo_task_element;
  }

  createNewInProgressTaskElement(InProgressTask) {
    const { name, id } = InProgressTask;

    const InProgress_task_element = document.createElement("div");
    InProgress_task_element.setAttribute(
      "class",
      "kanban_board_col_items_tasks_task_container kanban_board_col_inProgress_tasks_task_container"
    );

    const InProgress_task_name_element = document.createElement("p");
    const InProgress_task_name_element_text = document.createTextNode(name);
    InProgress_task_name_element.setAttribute(
      "class",
      "kanban_board_col_inProgress_tasks_task"
    );
    InProgress_task_name_element.appendChild(InProgress_task_name_element_text);
    InProgress_task_element.appendChild(InProgress_task_name_element);

    const InProgress_task_btn_element = document.createElement("button");
    const InProgress_task_btn_element_text = document.createTextNode("delete");
    InProgress_task_btn_element.setAttribute(
      "class",
      "del_kanban_board_col_items_task del_kanban_board_col_inProgress_task"
    );
    InProgress_task_btn_element.setAttribute("id", id);
    InProgress_task_btn_element.appendChild(InProgress_task_btn_element_text);
    InProgress_task_element.appendChild(InProgress_task_btn_element);

    return InProgress_task_element;
  }

  createNewDoneTaskElement(doneTask) {
    const { name, id } = doneTask;

    const done_task_element = document.createElement("div");
    done_task_element.setAttribute(
      "class",
      "kanban_board_col_items_tasks_task_container kanban_board_col_done_tasks_task_container"
    );

    const done_task_name_element = document.createElement("p");
    const done_task_name_element_text = document.createTextNode(name);
    done_task_name_element.setAttribute(
      "class",
      "kanban_board_col_done_tasks_task"
    );
    done_task_name_element.appendChild(done_task_name_element_text);
    done_task_element.appendChild(done_task_name_element);

    const done_task_btn_element = document.createElement("button");
    const done_task_btn_element_text = document.createTextNode("delete");
    done_task_btn_element.setAttribute(
      "class",
      "del_kanban_board_col_items_task del_kanban_board_col_done_task"
    );
    done_task_btn_element.setAttribute("id", id);
    done_task_btn_element.appendChild(done_task_btn_element_text);
    done_task_element.appendChild(done_task_btn_element);

    return done_task_element;
  }

  addTodoTaskElementOnUi(todoTaskElement) {
    const kanban_board_col_todo_tasks = document.querySelector(
      ".kanban_board_col_todo_tasks"
    );
    kanban_board_col_todo_tasks.appendChild(todoTaskElement);
  }

  addInProgressTaskOnUi(inProgressTaskElement) {
    const kanban_board_col_inProgress_tasks = document.querySelector(
      ".kanban_board_col_inProgess_tasks"
    );
    kanban_board_col_inProgress_tasks.appendChild(inProgressTaskElement);
  }

  addDoneTaskElementOnUi(doneElement) {
    const kanban_board_col_done_tasks = document.querySelector(
      ".kanban_board_col_done_tasks"
    );
    kanban_board_col_done_tasks.appendChild(doneElement);
  }

  updateKanbanBoardOnUi() {
    const kanban_board_col_todo_tasks = document.querySelector(
      ".kanban_board_col_todo_tasks"
    );
    const kanban_board_col_inProgress_tasks = document.querySelector(
      ".kanban_board_col_inProgess_tasks"
    );
    const kanban_board_col_done_tasks = document.querySelector(
      ".kanban_board_col_done_tasks"
    );

    kanban_board_col_todo_tasks.innerHTML = "";
    if (this.kanban_table_data.todo_data.length) {
      this.kanban_table_data.todo_data.forEach((todo_task_data) => {
        const todo_task_element = this.createNewTodoTaskElement(todo_task_data);
        this.addTodoTaskElementOnUi(todo_task_element);
      });
    }

    kanban_board_col_inProgress_tasks.innerHTML = "";
    if (this.kanban_table_data.inProgress_data.length) {
      this.kanban_table_data.inProgress_data.forEach((inProgress_task_data) => {
        const inProgress_task_element =
          this.createNewInProgressTaskElement(inProgress_task_data);
        this.addInProgressTaskOnUi(inProgress_task_element);
      });
    }

    kanban_board_col_done_tasks.innerHTML = "";
    if (this.kanban_table_data.done_data.length) {
      this.kanban_table_data.done_data.forEach((done_task_data) => {
        const done_task_element = this.createNewDoneTaskElement(done_task_data);
        this.addDoneTaskElementOnUi(done_task_element);
      });
    }
  }

  deleteTaskOnTodoData(id) {
    const deletedTodo_dataArray = this.kanban_table_data.todo_data.filter(
      (tdvalue) => tdvalue.id != id
    );
    this.kanban_table_data.todo_data = [...deletedTodo_dataArray];
  }

  getIdFromJson() {
    return {
      Id: this.#id,
    };
  }

  deleteTaskOnInProgressData(id) {
    const deletedInProgress_dataArray =
      this.kanban_table_data.inProgress_data.filter(
        (tdvalue) => tdvalue.id != id
      );
    this.kanban_table_data.inProgress_data = [...deletedInProgress_dataArray];
  }

  deleteTaskOnDoneData(id) {
    const deletedDone_dataArray = this.kanban_table_data.done_data.filter(
      (tdvalue) => tdvalue.id != id
    );
    this.kanban_table_data.done_data = [...deletedDone_dataArray];
  }

  get isKanbanTableEmpty() {
    return this.kanban_table_data.empty;
  }

  set KanbanTable_Empty_value(value) {
    this.kanban_table_data.empty = value;
  }
}

const project_wrapper = document.querySelector(".project_wrapper");

function sortAnArray(array = [], sortBy) {
  if (sortBy == "ascending") {
    return array.sort((a, b) => a - b);
  }
  if (sortBy == "descending") {
    return array.sort((a, b) => b - a);
  }
}

export class Projects {
  projects = [];
  sortBy = "ascending";
  empty = true;

  createNewProject(name, bypass = false) {
    ArgumentErrorHandling(
      "invalid argument passed on Projects.createNewProject method",
      name
    );

    const project = new Project(name);
    this.projects.push(project);
    return project;
  }

  createNewProjectElement(project) {
    const { name, date } = project;

    if (!project.Id) {
      const Id = project.getIdFromJson();

      project.Id = Id;
    }

    const project_element = document.createElement("div");
    project_element.setAttribute("class", "project");
    project_element.setAttribute("id", project.Id);

    const project_name_element = document.createElement("h4");
    const project_name_element_text = document.createTextNode(name);
    project_name_element.appendChild(project_name_element_text);
    project_element.appendChild(project_name_element);

    const project_date_element = document.createElement("p");
    const project_date_element_text = document.createTextNode(date);
    project_date_element.appendChild(project_date_element_text);
    project_element.appendChild(project_date_element);

    const project_btn_element = document.createElement("button");
    const project_btn_element_text = document.createTextNode("delete");
    project_btn_element.dataset.Id = project.Id;
    project_btn_element.setAttribute("class", "project_delete_btn");
    project_btn_element.appendChild(project_btn_element_text);
    project_element.appendChild(project_btn_element);

    return project_element;
  }

  addProjectElementOnUi(projectElement) {
    project_wrapper.appendChild(projectElement);
  }

  updateProjectElementsOnUi() {
    project_wrapper.innerHTML = "";
    if (this.projects.length) {
      this.projects.forEach((project) => {
        const project_element = this.createNewProjectElement(project);
        this.addProjectElementOnUi(project_element);
      });
    }
  }

  sortProjects(sortBy) {
    const timestampArray = this.projects.map((project) => project.timestamp);

    let sortByTimestampArray = undefined;

    if (sortBy == "ascending") {
      sortByTimestampArray = sortAnArray(timestampArray, "ascending");
    } else if (sortBy == "descending") {
      sortByTimestampArray = sortAnArray(timestampArray, "descending");
    } else {
      ArgumentErrorHandling();
    }

    let addedProjectId = "";

    const sorted_projects = sortByTimestampArray.map((timestamp) => {
      return this.projects.find((project) => {
        if (
          !addedProjectId.includes(project.Id) &&
          project.timestamp == timestamp
        ) {
          addedProjectId += project.Id;

          return project;
        }
      });
    });

    this.projects = [...sorted_projects];
    this.sortBy = sortBy;
  }

  displayProjectElementsOnUi(action = "unhide") {
    const project_wrapper = document.querySelector(".project_wrapper");
    if (action == "unhide") {
      if (this.projects.length) {
        project_wrapper.style.display = "flex";
      }
    }
    if (action == "hide") {
      project_wrapper.style.display = "none";
    }
  }

  deleteProjectFromProjects(id) {
    const deletedProjectsArray = this.projects.filter(
      (project) => project.Id != id
    );
    this.projects = [...deletedProjectsArray];
  }

  getProjectById(id) {
    const project = this.projects.filter((project) => project.Id == id);
    return project[0];
  }

  reloadProjects(projects) {
    this.projects = projects;
  }

  saveProjectsOnLocalStorage() {
    const projects = this;
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  reloadProjectsFromLocalStorage() {
    const projects = localStorage.getItem("projects");
    if (projects != null) {
      const localProjects = JSON.parse(projects);
      this.projects = localProjects.projects.map((value) =>
        Object.assign(new Project(" "), value)
      );
      this.empty = localProjects.empty;
      this.sortBy = localProjects.sortBy;
    }
  }

  UdpateReloadProjectsFromLocalStorageOnUi() {
    this.updateProjectElementsOnUi();

    this.displayProjectElementsOnUi("unhide");
  }
}
