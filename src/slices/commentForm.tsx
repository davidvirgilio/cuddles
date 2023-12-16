'use client'
import React, { useState, useEffect} from "react";
import { useSession } from "next-auth/react";


export default function Comment(){
    return(
        <form method="post">
            <div>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Leave a comment"
                    autoComplete="false"
                    required={true}
                />
            </div>
        </form>
    )
}