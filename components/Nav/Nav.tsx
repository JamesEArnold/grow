import { ReactElement } from 'react';

type NavProps = {
  title: string,
}

export const Nav = ({ title }: NavProps): ReactElement => <nav className='bg-slate-100 opacity-90 fixed top-0 w-full px-2 py-2.5'>
  <span className='text-2xl ml-6 sm:ml-32 font-bold text-slate-700'>{title}</span>
</nav>;
