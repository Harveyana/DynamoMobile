
export const formatDate = (dateStr: string)=>{

    if (!dateStr) return '';

    const date = new Date(dateStr);

    const options = {
        weekday: 'long', // "Saturday"
        year: 'numeric', // "2024"
        month: 'long', // "June"
        day: 'numeric', // "22"
    };
      // Format date
      return date.toLocaleDateString('en-US', options);
      
}

export const truncateString = (str:string, length:number) => {

    if(str){

       return str.slice(0, length) + '...';
    }

    // if (str.length <= length) {
    //   return str;
    // }
    
  }