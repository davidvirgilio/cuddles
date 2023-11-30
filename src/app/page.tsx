import Image from 'next/image'
import styles from './page.module.sass'
import Link from 'next/link'
import { Icon } from '@/slices/logos'

export default function Home() {
  return (
    <main>
      <div className={styles.home}>
        <Icon />
        <h1>A place for pet lovers</h1>
        <div>
          <Link className='btn' href={"/sign-up"}>Sign up</Link>
          <p>Already have an account?</p>
          <Link className='btn' href={"/log-in"}>Log in</Link>
        </div>
      </div>
    </main>
  )
}
