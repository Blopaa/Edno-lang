export default function checkSameParent(parentLocation: string[], instanceLocation: string[]): boolean {
    for(let i = 0; i < parentLocation.length; i++) {
        if(parentLocation[i] !== instanceLocation[i]){
            return false
        }
    }

    return true;
}