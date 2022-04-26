import React from "react";


interface Person {
    firstName: string,
    lastName: string
}


// Properties (aka "props")
interface Props {
    text: string,     // Required
    i: number,        // Required
    person?: Person  // This is an optional property!
}


export const TextField: React.FC <Props> = ({text, i, person}) => {
    // Handle optional properties
    let _person:Person = person || {firstName:"default", lastName:"default"}

    return(
        <div>
            <p>Test property: {text}</p>
            <p>i property: {i}</p>
            <p>person property: {_person.firstName} {_person.lastName}</p>
        </div>
    )
}
