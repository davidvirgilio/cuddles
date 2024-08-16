/*
* Description: This file defines a React component named CatchAll.
* This component doesn't render anything, as it simply returns null.
* Good to know: We use a catch-all route in our @add slot to close the modal because of the behavior described in Active state and navigation. Since client-side navigations to a route that no longer match the slot will remain visible, we need to match the slot to a route that returns null to close the modal.
* See  https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
*/

export default function CatchAll() {
    return null
  }