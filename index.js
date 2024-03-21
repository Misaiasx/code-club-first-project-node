const express = require("express")
const uuid = require('uuid')
const port = 3000
const app =express()
app.use(express.json())

const projects = []

const checkUserId = (request , response, next)=>{
    const {id} = request.params
    const index = projects.findIndex(user => user.id === id)

    if(index < 0){

        return response.status(404).json({error:"User not found"})
    }
    
    request.userIndex = index
    request.userId = id

    next()
}




app.get('/projects',(request, response)=>{

    

   return response.json(projects)
})
app.post('/projects', (request, response)=>{
    const { name,age} = request.body

    const user = {id:uuid.v4(), name,age}
    projects.push(user)

    return response.status(201).json(user)
})

app.put('/projects/:id', checkUserId, (request, response)=>{
    
    const {name,age} = request.body
    const index = request.userIndex
    const id = request.userId
    const updatedUser = {id,name,age}
         
    projects[index] = updatedUser


    

    return response.json(updatedUser)
 })

 
app.delete('/projects/:id', checkUserId, (request, response)=>{
     const index = request.userIndex

  
     
     projects.splice(index,1)




    return response.status(204).json()
 })

app.listen(port, () =>{
    console.log(`🌋Server started on port ${port}`  )
})


