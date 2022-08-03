import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";

interface activeLinkProps {
  href: string
  children: React.ReactNode
}

const ActiveLink = ({href, children}: activeLinkProps) => {
  const router = useRouter()
  const isCurrentPath = router.pathname === href || router.asPath === href

  return (
    <div>
      <Link href={href}>
        <a
          style={{
            textDecoration: 'none',
            background: isCurrentPath ? '#6b9997' : 'black',
            borderRadius: isCurrentPath ? '20px' : 'none',
          }}
        >
          {children}
        </a>
      </Link>
    </div>
  );
};

export default ActiveLink;