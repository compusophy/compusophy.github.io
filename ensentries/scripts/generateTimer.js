 function countdownTimer() {
      var currentTime = new Date();
      var targetDate = new Date(currentTime.getFullYear(), 6, 15, 0, 0, 0); // July is month 6 (0-based index)

      // Check if the target date has already passed in the current year
      if (currentTime.getMonth() > 6 || (currentTime.getMonth() === 6 && currentTime.getDate() > 15)) {
        targetDate.setFullYear(targetDate.getFullYear() + 1); // Set target date to next year
      }

      // Calculate the time difference between current time and target time
      var timeDiff = targetDate.getTime() - currentTime.getTime();
      if (timeDiff < 0) {
        // Target time has already passed
        document.getElementById('countdown-timer').textContent = '00:00:00';
        return;
      }

      // Convert time difference to hours, minutes, and seconds
      var hours = Math.floor(timeDiff / (1000 * 60 * 60)).toString().padStart(2, '0');
      var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000).toString().padStart(2, '0');
      var formattedTime = hours + ':' + minutes + ':' + seconds;

      // Update the countdown timer
      document.getElementById('countdown-timer').textContent = formattedTime;
    }

    // Update the countdown timer every second
    setInterval(countdownTimer, 1000);