import { User } from "./user.model";

export interface TaskModel {
    id: number;
    status: 'pending' | 'in_progress' | 'completed';
    due_date: string | null;
    priority: 'low' | 'medium' | 'high';
    comments: string | null;
    description: string;
    created_at: Date;
    updated_at: Date;
    created_by: User;
    assigned_to: User;
}

export interface TaskCreateModel {
    status: 'pending' | 'in_progress' | 'completed';
    due_date: string;
    priority: 'low' | 'medium' | 'high';
    description: string;
    assigned_to_id: number;
}

export interface TaskUpdateModel {
    id: number;
    status: 'pending' | 'in_progress' | 'completed';
    due_date: string;
    priority: 'low' | 'medium' | 'high';
    description: string;
    assigned_to_id: number;
}