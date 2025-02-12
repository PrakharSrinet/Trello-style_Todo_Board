import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  newTodoText: string = '';
  newTodoDescription: string = '';
  editingTodoId: number | null = null;
  editedText: string = '';
  editedDescription: string = '';
  isEditModalOpen: boolean = false;
  isAddModalOpen: boolean = false;
  isEditing: boolean = false;

  lanes: Record<'pending' | 'in-progress' | 'completed', Todo[]> = {
    pending: [],
    'in-progress': [],
    completed: [],
  };

  lanesKeys: ('pending' | 'in-progress' | 'completed')[] = ['pending', 'in-progress', 'completed'];

  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef) {}

  /**
   * Initializes the component by fetching todos from the API
   * and categorizing them into different lanes based on status.
   */
  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => {
      this.lanes = {
        pending: todos.filter((todo) => todo.status === 'pending'),
        'in-progress': todos.filter((todo) => todo.status === 'in-progress'),
        completed: todos.filter((todo) => todo.status === 'completed'),
      };
      this.cdr.detectChanges();
    });
  }

  /**
   * Opens the modal for adding a new todo.
   */
  public openAddModal() {
    this.isAddModalOpen = true;
  }

  /**
   * Closes any open modal (add or edit).
   */
  public closeModal() {
    this.isAddModalOpen = false;
    this.isEditModalOpen = false;
    this.newTodoText = "";
  }

  /**
   * Adds a new task to the 'pending' lane.
   * If a description is not provided, an empty string is assigned.
   */
  public addTodo() {
    if (!this.newTodoText.trim()) return;

    const newTodo: Todo = {
      id: Date.now(), // Temporary ID
      todo: this.newTodoText,
      description: this.newTodoDescription || "", // Ensure description is always set
      status: 'pending',
      completed: false
    };

    this.todoService.addTodo(newTodo).subscribe((createdTodo) => {
      this.lanes = {
        ...this.lanes,
        pending: [{ ...createdTodo, description: newTodo.description }, ...this.lanes.pending] // Ensure description persists
      };

      // Reset fields
      this.newTodoText = '';
      this.newTodoDescription = '';
      this.isAddModalOpen = false;
      this.cdr.detectChanges();
    });
  }

  /**
   * Handles dragging and dropping tasks across different lanes.
   */
  public drop(event: CdkDragDrop<Todo[]>, newStatus: 'pending' | 'in-progress' | 'completed') {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedTodo = event.previousContainer.data[event.previousIndex];
      movedTodo.status = newStatus;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.lanes = { ...this.lanes };
    }
  }

  /**
   * Deletes a task from a given lane.
   * 
   * @param lane - The lane from which the task is being deleted
   * @param index - The index of the task in the lane
   */
  public deleteTodo(lane: 'pending' | 'in-progress' | 'completed', index: number) {
    this.lanes[lane].splice(index, 1);
    this.lanes = { ...this.lanes };
  }

  /**
   * Opens the edit modal and populates it with the selected task's details.
   * 
   * @param todo - The task being edited
   */
  public openEditModal(todo: Todo) {
    this.isEditModalOpen = true;
    this.editingTodoId = todo.id;
    this.editedText = todo.todo;
    this.editedDescription = todo.description || ''; // Load description if exists
  }

  /**
   * Closes the edit modal and resets the editing state.
   */
  public closeEditModal() {
    this.isEditModalOpen = false;
    this.editingTodoId = null;
  }

  /**
   * Saves the edited task and updates the UI.
   */
  public saveEdit() {
    if (!this.editedText.trim() || this.editingTodoId === null) return;

    let updatedTodo: Todo | undefined;
    Object.keys(this.lanes).forEach((lane) => {
      const taskList = this.lanes[lane as keyof typeof this.lanes];
      updatedTodo = taskList.find((t) => t.id === this.editingTodoId);
      if (updatedTodo) {
        updatedTodo.todo = this.editedText;
        updatedTodo.description = this.editedDescription;
      }
    });

    if (updatedTodo) {
      this.todoService.updateTodo(updatedTodo).subscribe(() => {
        this.isEditModalOpen = false;
        this.editingTodoId = null;
        this.lanes = { ...this.lanes };
      });
    }
    this.isEditModalOpen = false;
  }

  /**
   * Deletes the currently edited task.
   */
  public deleteCurrentTodo() {
    if (this.editingTodoId === null) return;

    this.todoService.deleteTodo(this.editingTodoId).subscribe(() => {
      Object.keys(this.lanes).forEach((lane) => {
        this.lanes[lane as keyof typeof this.lanes] = this.lanes[lane as keyof typeof this.lanes].filter(
          (t) => t.id !== this.editingTodoId
        );
      });

      this.isEditModalOpen = false;
      this.editingTodoId = null;
      this.lanes = { ...this.lanes };
    });
  }

  /**
   * Toggles the edit mode for a task.
   */
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  /**
   * Custom trackBy function for ngFor to improve performance.
   */
  public trackById(index: number, item: Todo) {
    return item.id;
  }
}
