import { Request, Response } from 'express';
import { IClients } from '../models/clients';
import ClientRepository from '../models/clientsModel'

function home(req: Request, res: Response, next: any) {
        res.render('home');
}

async function index(req: Request, res: Response, next: any) {
        const clients = await ClientRepository.findAll();
        res.render('index', {clients: clients});
}

async function show(req: Request, res: Response, next: any) {
    const client = await ClientRepository.findByPk(req.params.id);
    res.render('show', {client: client});
}

function create(req: Request, res: Response, next: any) {
    res.render('create');
}


async function store(req: Request, res: Response, next: any) {
    try {
        const client = req.body as IClients;
        await ClientRepository.create({name: client.name, email: client.email});
        res.redirect('/clients');
    } catch(error) {
        console.log(error);
        res.status(500).end();
    }
}


async function edit(req: Request, res: Response, next: any) {
    try {
        const client = await ClientRepository.findByPk(req.params.id);
        if (client === null) {
            res.status(404).send('Não encontrado');
        } else {
            res.status(200).render('edit', {client: client});
        }
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}


async function update(req: Request, res: Response, next: any) {
    try {
        await ClientRepository.update(
            req.body as IClients, {
                where: {
                    id: req.params.id
                }
        });
        res.redirect('/clients');
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}



async function destroy(req: Request, res: Response, next: any) {
    try {
        await ClientRepository.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/clients');
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}




export default { home, index, show, create, store, edit, update, destroy };