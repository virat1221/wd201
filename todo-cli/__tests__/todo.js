const todoList = require('../todo');
let { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("todoList Test Suite", () => {
    beforeEach(() => {
        // Reset the todo list for each test
        ({ all, markAsComplete, add, overdue, dueToday, dueLater } = todoList());
    });

    test("should create a new todo", () => {
        expect(all.length).toBe(0);
        add({
            title: "test todo",
            completed: false,
            dueDate: new Date().toISOString().split("T")[0] // Use today's date
        });
        expect(all.length).toBe(1);
        expect(all[0].title).toBe("test todo");
    });

    test("should mark a todo as completed", () => {
        add({
            title: "test todo",
            completed: false,
            dueDate: new Date().toISOString().split("T")[0]
        });
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });

    test("should retrieve overdue items", () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        add({
            title: "overdue todo",
            completed: false,
            dueDate: yesterday.toISOString().split("T")[0]
        });

        const todayTodo = {
            title: "due today todo",
            completed: false,
            dueDate: new Date().toISOString().split("T")[0]
        };
        add(todayTodo);

        expect(overdue().length).toBe(1);
        expect(overdue()[0].title).toBe("overdue todo");
    });

    test("should retrieve due today items", () => {
        const todayTodo = {
            title: "due today todo",
            completed: false,
            dueDate: new Date().toISOString().split("T")[0]
        };
        add(todayTodo);

        const tomorrowTodo = {
            title: "due tomorrow todo",
            completed: false,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]
        };
        add(tomorrowTodo);

        expect(dueToday().length).toBe(1);
        expect(dueToday()[0].title).toBe("due today todo");
    });

    test("should retrieve due later items", () => {
        const tomorrowTodo = {
            title: "due tomorrow todo",
            completed: false,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]
        };
        add(tomorrowTodo);

        const nextWeekTodo = {
            title: "due next week todo",
            completed: false,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]
        };
        add(nextWeekTodo);

        expect(dueLater().length).toBe(2);
        expect(dueLater()[0].title).toBe("due tomorrow todo");
        expect(dueLater()[1].title).toBe("due next week todo");
    });
});
