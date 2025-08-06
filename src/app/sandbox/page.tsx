import React from 'react';
import { db } from '~/server/db';
import { mockFolders, mockFiles } from '~/lib/mock-data';
import { files, folders } from '~/server/db/schema';

// We could've created the seeding function on the server, but by defining it in a server action, we can call it from the ui

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form
        action={async () => {
          // this action will be called on form submission, on the server! i.e. logs display in the terminal
          // an action creates a path for a post to the route the component is mounted on
          'use server';

          console.log('sup nerds');

          const folderInsert = await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              name: folder.name,
              parent: index !== 0 ? BigInt(1) : BigInt(0),
            })),
          );
          console.log('🚀 ~ SandboxPage ~ folderInsert:', folderInsert);

          const fileInsert = await db.insert(files).values(
            mockFiles.map((file, index) => ({
              name: file.name,
              size: '50000',
              url: file.url,
              parent: BigInt((index % 3) + 1),
            })),
          );
          console.log('🚀 ~ SandboxPage ~ fileInsert:', fileInsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
