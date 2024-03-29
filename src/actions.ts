import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Todo } from './entities/Todo'

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.first_name) throw new Exception("Please provide a first_name")
    if (!req.body.last_name) throw new Exception("Please provide a last_name")
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!req.body.password) throw new Exception("Please provide a password")


    const userRepo = getRepository(Users)
    // fetch for any user with this email
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("Users already exists with this email")

    const newUser = getRepository(Users).create(req.body);  //Creo un usuario
    const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario
    const usuario = await getRepository(Users).findOne({ where: {email: req.body.email}})
    if (!usuario) throw new Exception("Usuario doesnt exist")

    const todo = new Todo();
    todo.label = "Tarea ejemplo"; 
    todo.done = false;
    todo.users = usuario;

    const result = await getRepository(Todo).save(todo);
    return res.json(result);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).find();
    return res.json(users);
}

//GET TODOS CON USER

export const getTodos = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).findOne(req.params.user_id, {relations:["todo"]});
    if (!users) {
        return res.json({ "message": "Usuario no existe" })
    }
    return res.json(users.todo);
}


// PUT TODOS
export const putTodos = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.label) throw new Exception("Please provide a label")
    if (!req.body.done) throw new Exception("Please provide a state")

    const todoList = getRepository(Todo)
    // fetch for any user with this email
    const newTodo = await todoList.findOne({ where: {label:req.body.label}})
    if (newTodo) throw new Exception("Todo already exists with this email")

    const user = await getRepository(Users).findOne(req.params.user_id);
    if (!user)  throw new Exception("Not found")

    const nuevoTodo = getRepository(Todo).create({...req.body, users: user});  //Creo un usuario
    //saber quien es el user

    const results = await getRepository(Todo).save(nuevoTodo); //Grabo el nuevo todo

    return res.json(results);
}

//DELETE TODOS Y USER

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).findOne(req.params.id);
    if (!users) {
        return res.json({ "message": "Usuario no existe" })
    }
    else {
        const result = await getRepository(Users).delete(users);
        return res.json(result);
    }
}

