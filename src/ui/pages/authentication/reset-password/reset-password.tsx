'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import style from './reset-password.module.sass'

export default function ResetPassword({token}:{token: string}){

    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = async (e:any) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        return setError('Passwords do not match');
      }
  
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (res.ok) {
        router.replace('/log-in')
      } else {
        setError('Error resetting password');
      }
    };
  
    return (
        <>
        <form onSubmit={handleSubmit} className={style.changePasswordForm}>
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </label>
          { error && <p>{error}</p>}
          <button type="submit" className={style.btn}>Reset Password</button>
        </form>
        </>
    );
}

  
  