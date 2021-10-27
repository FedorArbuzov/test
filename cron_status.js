async function f(db){
    const users = await db.collection('users').get();
    
}

f()