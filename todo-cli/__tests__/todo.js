const todoList = require('../todo');
const {all, markAsComplete, add} =todoList();
describe("todoList Test Suite", ()=>{
    test ("should add new todo", ()=>{
        expect(all.length).toBe(0);
        add(
            {
                title: "test todo",
                completed: false,
                dueDate: new Date().toLocaleDateString("en-CA")
            }
        )
        expect(all.length).toBe(1);
    });
    test ("should mark as complete", ()=>{
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    })
})
