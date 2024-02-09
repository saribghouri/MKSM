const onChange = async (checked, userId) => {
    console.log("userId", userId);
    try {
      const token = Cookies.get("apiToken");
      const response = await fetch(
        `https://mksm.blownclouds.com/api/all/user?userId=${userId}&isActives=${checked ? 'active' : 'inactive'}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedUsers = inActiveUser.map(user => {
          if (user.id === userId) {
            return { ...user, isActives: checked ? "1" : "0" }; // Update the active/inactive status
          }
          return user;
        });
        setInActiveUser(updatedUsers);
        setSelectedUserId(userId);
        message.success(`User set to ${checked ? 'active' : 'inactive'} successfully`);
      } else {
        message.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status: ", error);
      message.error("An error occurred while updating user status");
    }
};