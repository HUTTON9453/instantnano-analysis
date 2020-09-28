export function ValueToUnit(value){
    if(value>=12){
        return (Math.pow(10, 12-value)) + 'p';
    }else if(value>=9){
        return (Math.pow(10, 9-value)) + 'n';
    }else if(value>=6){
        return (Math.pow(10, 6-value)) + 'μ';
    }else if(value>=3){
        return (Math.pow(10, 3-value)) + 'm';
    }
    return (Math.pow(10, value))

}