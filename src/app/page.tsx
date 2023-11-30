import Image from 'next/image'
import styles from './page.module.sass'

export default function Home() {
  return (
    <main>
      <div className={`${styles.home} flex-col`}>
        <Image src="/images/logo.svg" alt='Cuddles logo' width={193} height={174} priority/>
        <h1>A place for pet lovers</h1>
        <div>
          <button className='btn'>Sign up</button>
          <p>Already have an account?</p>
          <button className='btn'>Log in</button>
        </div>
      </div>
    </main>
  )
}
