class vinay{

    constructor(name,age){
        this.name=name;
        this.age=age;

    }

    display(){
        console.log("Name is:"+this.name+" & the age is:"+this.age);
    }

}

let val1=new vinay("Vinay",36);
console.log(val1.name);
console.log(val1.age);
val1.display();
