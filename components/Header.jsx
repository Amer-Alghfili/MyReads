import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between p-8 mb-6">
        <Link href="/">
          <a>
            <div className="text-5xl">MyReads</div>
          </a>
        </Link>
        <nav>
          <ul className="flex">
            <li className="mx-3">
              <Link href="/books">
                <a className="tranisition-border duration-75 ease-in hover:border-b-2 border-green-600">
                  Books
                </a>
              </Link>
            </li>
            <li className="mx-3">
              <Link href="/shelves">
                <a className="tranisition-border duration-75 ease-in hover:border-b-2 border-green-600">
                  My Shelves
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
