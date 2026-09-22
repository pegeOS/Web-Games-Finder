class contactsDAO {
    // métodos para CRUD
    // READ
    static async getContacts(client) {
        const cursor = await client
        .find()
        .project({_id:0})
        .sort({nome:1})
        .limit(10)
        try {
            const results = await cursor.toArray()
            return results
        } catch(err) {
            console.log(err)
        }
    }
    // CREATE
    static async insertContact(client, doc) {
        try {
            const ok = await client
            .insertOne(doc)
            if (ok.insertedId === null) {
                return { error: "Erro ao inserir usuário" }
            } else {    
                return ok
            }
        } catch(err) {
            console.log(err)
        }
    }
    // DELETE
    static async deleteContactByNome(client, nome_) {
        try {
            const ok = await client.deleteOne({ nome: nome_ })
            if (ok.deletedCount === 0) {
                return { error: "Erro ao deletar usuário" }
            } else {
                return ok
            }
        } catch(err) {
            console.log(err)
        }
    }

    // UPDATE
    static async updateTelefoneByEmail(client, email_, tel_) {
        try {
            const docs = await client
            .updateOne(
                { email: email_ }, 
                { $set: { telefone: tel_ } }
            )
            if (docs.modifiedCount === 0) {
                return { error: "Erro ao atualizar telefone" }
            } else {
                return docs
            }
        } catch(err) {
            console.log(err)
        }
    }

    // UPDATE ALTERNATIVE
    static async updateTelefoneByEmail_v2(client, email_, tel_) {
        try {
            const doc = await client
            .findOneAndUpdate(
                { email: email_ },
                { $set: { telefone: tel_ } },
                { returnNewDocument: true }
            )
            if (!doc) {
                return { error: "Erro ao atualizar telefone" }
            } else {
                return doc
            }
            
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = contactsDAO