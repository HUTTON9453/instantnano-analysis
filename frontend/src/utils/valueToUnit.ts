export function ValueToUnit(value){
    if(value>=11){
        return (Math.pow(10, 12-value)) + ' p';
    }else if(value>=8){
        return (Math.pow(10, 9-value)) + ' n';
    }else if(value>=5){
        return (Math.pow(10, 6-value)) + ' μ';
    }else if(value>=2){
        return (Math.pow(10, 3-value)) + ' m';
    }
    return (Math.pow(10, value))

}