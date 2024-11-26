'use server';

import { Stuff, Condition, Profile, StudySession } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

export async function createProfile(profile: Profile) {
  // Check if a profile with the given userId exists
  const existingProfile = await prisma.profile.findUnique({
    where: { userId: profile.userId },
  });

  if (existingProfile) {
    // If profile exists, update it
    await prisma.profile.update({
      where: { userId: profile.userId },
      data: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        major: profile.major,
      },
    });
  } else {
    // If profile does not exist, create a new one
    await prisma.profile.create({
      data: {
        userId: profile.userId,
        firstName: profile.firstName,
        lastName: profile.lastName,
        major: profile.major,
      },
    });
  }

  // Redirect after operation (server-side redirect)
  return redirect('/myProfile'); // Ensure you're using the proper `redirect` function
}

export async function createSession(studySession: StudySession) {
  // Check if a study session with the given userId exists
  // If profile does not exist, create a new one

  await prisma.studySession.create({
    data: {
      title: studySession.title,
      added: studySession.added,
      userId: studySession.userId,
      users: {
        connect: { id: studySession.userId },
      },
    },
  });
  // After adding, redirect to the sessions page
  redirect('/sessions');
}
export async function addSession(studySessionId: number, userId: number) {
  // Check if the study session exists
  const sessionExists = await prisma.studySession.findUnique({
    where: { id: studySessionId },
  });

  if (!sessionExists) {
    throw new Error(`Study session with ID ${studySessionId} does not exist.`);
  }

  // Update the session to include the current user
  await prisma.studySession.update({
    where: { id: studySessionId },
    data: {
      users: {
        connect: { id: userId }, // Ensure userId is defined
      },
    },
  });
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
