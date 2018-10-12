const getProfile = ({ state }) => state.profile
const isProfileComplete = (profile) => profile.isComplete

export default function ({ store, redirect }) {
  const profile = getProfile(store)
  if (!isProfileComplete(profile)) {
    redirect('/registration')
  }
}
