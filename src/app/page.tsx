'use client';

import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAutUser = async(e: React.FormEvent<HTMLFormElement>, type: 'SIGN_IN' | 'SIGN_UP') => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (type === 'SIGN_UP') {
      const {data, error} = await supabase.auth.signUp({email, password});
      if (error) {
        setMessage(`❌ Authication Failed: ${error.message}`);
      }
      else if (data.user) {
        setMessage('✅Congratulation! YOU have registered completely');
      }

      };
    if (type === 'SIGN_IN') {
      const {data, error} = await supabase.auth.signInWithPassword({email, password});
      if (error) {
        setMessage(`❌Authentication Failed: ${error.message}`);

      }
      else if (data.user) {
        setMessage('✅Congratulation! You re logged into next page......');
        router.push('/dashboard');
      }
    };

    setLoading(false);
  };

  return(
    <div className='flex flex-col min-h-screen bg-gray-50 justify-center items-center py-5'>
      <div className='rounded-xl shadow-xl bg-gray-100 w-full max-w-md border border-gray-300 p-8 space-y-6 py-4'>
        <div className='text-2xl font-bold uppercase flex items-center justify-center gap-2'>
           <span className='text-2xl'>🐘</span>
           <h2 className='text-blue-700 tracking-wider '>Union bank pls</h2>
        </div>
        <p className='text-sm text-bold text-base text-center'>
          Enter your email address and password to get access to ledger account.
        </p>
        <form onSubmit={(e) => handleAutUser(e, 'SIGN_IN')} className='space-y-6 mt-2'>
          <label className='text-sm font-medium text-base mb-1'>Email</label>
          <div>
            <input 
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='example@tyhoo.con'
              className='focus:ring-2 py-2 px-4 focus:outline-none focus:ring-blue-500 border border-blue-300 bg-blue-100 w-full rounded-xl text-sm text-base' required>
            </input>
          </div>
          <label className='text-sm font-medium text-base mb-1'>Password</label>
          <div>
            <input 
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='•••••••'
              className='focus:ring-2 py-2 px-4 focus:outline-none focus:ring-blue-500 border border-blue-300 bg-blue-100 w-full rounded-xl text-sm text-base' required>

            </input>
            {message &&(
              <div className='text-sm text-center text-blue-600 mt-3'>
                {message}
              </div>
            )}

          </div>
          <div className=' flex flex-col justify-center items-center gap-4 '>
            <button 
              type='submit'
              disabled={loading}
              className='rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-emerald-300
              focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed
              ease-in-out transition-all duration-200 border border-blue-300 py-3 px-6'>
              {loading ? (<div className='flex items-center justify-center gap-3 font-bold '>
                  <span className='animate-spin rounded-full border-solid border-2 h-5 w-5 border-t-transparent border-white'></span>
                  <span className='text-sm text-white'> Processing.....</span>
                </div>): ('SIGN IN')}
            </button>
            < button 
              type='button'
              onClick={(e) => handleAutUser(e as unknown as React.FormEvent<HTMLFormElement>, 'SIGN_UP')}
              className='w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-gray-600 hover:bg-gray-700 text-white font-bold border border-gray-300 py-3 px-6'>
                Create An Account
            </button>

          </div>
        </form>
      </div>
    </div>
  );

}