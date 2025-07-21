
const FS = require('fs');
const {mkdir,rmdir,unlink,writeFile, readdir} = require('fs/promises');
const path = require('path');

const users = [
    {name: 'Alice', last: 'cohen'},
    {name: 'Alice', last: 'hello'},
    {name: 'Bob', last: 'here'}, 
]
const dirname = __dirname + "/users";

async function removeFilesAndFolders() {
  
    try {
        const users = await readdir(dirname);
        for (const user of users){
            await unlink(`${dirname}/${user}`);
        }
        await rmdir(dirname);
        console.log("All files and folders removed successfully.");
    }catch (error){
        console.error("Error reading directory:", error);
    }
}

async function makeAndRemoveFilesAndFolders(){
    try {
        await mkdir(dirname);
        for (const user of users){
            const content = `${user.name}_${user.last}`;
            const fileName = `${content}.txt`;
             FS.writeFile(`${dirname}/${fileName}`,content,(error) => {
                if (error)
                    console.error("Error writing file:", error);
                
             });
             setTimeout(removeFilesAndFolders,7500)
                
           

        }
        console.log("Files created successfully.");
    } catch (error) {
        console.error("Error creating files:", error);
        await removeFilesAndFolders();
    }
}

makeAndRemoveFilesAndFolders();
