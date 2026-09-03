# Linux Cheat Sheet for QA / SDET Engineers 

A practical, day-to-day reference — from basic navigation to CI/CD and test-automation debugging on Linux.

---

## 1. Navigation
```
pwd                  # Print the current working directory.
ls                   # List files and folders in the current directory.
ls -l                # List files with permissions, owner, size and modified date.
ls -a                # Show all files, including hidden files (starting with .).
ls -lh               # Long listing with human-readable file sizes (K/M/G).
cd folder            # Change to the specified directory.
cd ..                # Move up one directory level.
cd -                 # Go back to the previous directory.
cd ~                 # Go to your home directory.
```

## 2. File & Directory Operations
```
touch file.txt       # Create a new empty file (or update its timestamp).
mkdir reports        # Create a new directory named reports.
mkdir -p a/b/c       # Create nested directories in one go.
rm file.txt          # Delete a file.
rm -rf folder        # Delete a directory and all its contents recursively.
cp file1 file2       # Copy file1 to file2.
cp -r dir1 dir2      # Copy an entire directory recursively.
mv old new           # Move or rename a file/directory.
ln -s target link    # Create a symbolic link (shortcut) to a file/folder.
stat file.txt        # Show detailed metadata: size, permissions, timestamps.
cat file.txt         # Display the complete contents of a file.
less file.txt        # Open a file for scrolling page by page (press q to quit).
head file.txt        # Display the first 10 lines of a file.
head -n 50 file.txt  # Display the first 50 lines.
tail file.txt        # Display the last 10 lines of a file.
tail -f app.log      # Continuously display new log entries as they are written.
```

## 3. Finding Files
```
find . -name "*.log"           # Find all .log files under the current directory.
find . -name "*.java"          # Find all Java source files.
find / -name config.yaml       # Search the entire filesystem for config.yaml.
find . -mtime -1               # Files modified in the last 1 day (useful: "what changed today").
find . -size +100M             # Files larger than 100 MB (e.g., bloated log/report files).
find . -name "*.tmp" -delete   # Find and delete matching files in one shot.
```

## 4. Searching Inside Files (grep)
```
grep ERROR app.log               # Find lines containing "ERROR".
grep -i timeout app.log          # Search ignoring uppercase/lowercase.
grep -n Exception app.log        # Display matching lines with line numbers.
grep -r "payment" .              # Search recursively in all files.
grep -c ERROR app.log            # Count how many lines contain ERROR.
grep -E "ERROR|WARN" app.log     # Search for either ERROR or WARN.
grep -v INFO app.log             # Show lines that do NOT match (exclude noise).
grep -A 5 Exception app.log      # Show the matching line plus 5 lines AFTER it (stack trace context).
grep -B 3 Exception app.log      # Show 3 lines BEFORE the match.
grep -A 5 -B 3 Exception app.log # Show context both before and after — great for reading failures.
grep "2026-08-25" app.log | grep ERROR
                                 # Find ERROR logs generated on a specific date.
```

## 5. Text Processing & Transformation (awk, sed, cut)
```
awk '{print $1}' access.log        # Print the 1st column/field of every line.
awk -F',' '{print $2}' data.csv    # Use a custom delimiter (comma) and print the 2nd field.
awk '{print $1, $NF}' file.log     # Print the first and the last field of each line.
cut -d',' -f1,3 data.csv           # Extract specific columns (1 and 3) by delimiter.
sed 's/foo/bar/' file.txt          # Replace the first "foo" with "bar" on each line.
sed 's/foo/bar/g' file.txt         # Replace ALL occurrences of "foo" with "bar".
sed -i 's/old/new/g' config.yaml   # Edit the file in place (careful — no undo).
tr 'a-z' 'A-Z' < file.txt          # Translate/convert lowercase to uppercase.
```
> Handy for reshaping raw log lines or CSV test-data files before feeding them into a report or script.

## 6. Comparing Files & Output
```
diff expected.txt actual.txt     # Show line-by-line differences between two files.
diff -u expected.txt actual.txt  # Unified diff format (like a git diff) — easier to read.
diff -q file1 file2              # Just report whether files differ, without details.
comm file1 file2                 # Compare two SORTED files: lines unique to each + common lines.
```
> Use this to compare an expected API/DB response against the actual one, or two log runs before/after a fix.

## 7. Pipes
```
cat app.log | grep ERROR
# Read the file and pass its contents to grep.

ps -ef | grep java
# Find only Java-related running processes.

grep ERROR app.log | wc -l
# Count the number of ERROR entries.

find . -name "*.log" | xargs grep -l "OutOfMemory"
# Feed found files into another command — here, find which log files mention OOM errors.
```
The `|` (pipe) sends the output of one command as the input to another command.
`xargs` takes piped input and turns it into arguments for the next command — useful for running an action on many files found by `find`.

## 8. Sorting
```
sort users.txt            # Sort lines alphabetically.
sort -r users.txt         # Sort in reverse order.
sort -n numbers.txt       # Sort numerically (not alphabetically).
sort users.txt | uniq     # Remove duplicate adjacent lines after sorting.
sort file.txt | uniq -c   # Count occurrences of each unique line.
```

## 9. Counting
```
wc -l file.txt            # Count the number of lines.
wc -w file.txt             # Count the number of words.
wc -c file.txt             # Count the number of characters.
grep ERROR app.log | wc -l
                           # Count how many ERROR log entries exist.
```

## 10. Process & Job Management
```
ps -ef                # Display all running processes.
ps -ef | grep java    # Find Java application processes.
pgrep -f playwright   # Find process IDs by name pattern (no need to pipe to grep).
kill PID              # Gracefully terminate a process.
kill -9 PID           # Forcefully kill a process if it won't stop.
pkill -f node         # Kill all processes matching a name pattern.
top                   # Display live CPU, memory and process usage.
htop                  # Interactive process viewer (if installed).

command &             # Run a command in the background, get the shell back immediately.
jobs                  # List background jobs in the current shell session.
fg                    # Bring the most recent background job to the foreground.
nohup command &       # Run a command immune to hangups — keeps running after you log out/close SSH.
disown                # Detach a background job from the shell so it survives shell exit.
echo $?               # Print the exit code of the LAST command (0 = success — vital for CI/CD scripts).
```

## 11. Disk Usage
```
df -h              # Show available and used disk space in human-readable format.
du -sh reports     # Display total size of the reports directory.
du -sh *           # Display the size of every file/folder in the current directory.
du -sh * | sort -rh | head -10
                   # Top 10 biggest files/folders in the current dir — quick disk-space triage.
```

## 12. File Permissions
```
ls -l                # Display file permissions.
chmod +x script.sh   # Give execute permission to the script.
chmod 755 script.sh  # Owner: read/write/execute, Group/Others: read/execute.
chmod 644 file.txt   # Owner: read/write, Group/Others: read only.
chown user:group file.txt
                     # Change the owner and group of a file.
```
**Octal quick reference:** `4`=read, `2`=write, `1`=execute (add them up). `755` = rwxr-xr-x, `644` = rw-r--r--.

## 13. Networking
```
ip addr
# Display network interfaces and IP addresses.

ifconfig
# Older command to display network configuration.

ping google.com
# Verify network connectivity and measure response time.

curl https://example.com
# Send an HTTP GET request.

curl -X POST http://localhost:8080/api -H "Content-Type: application/json" -d '{"key":"value"}'
# Send a POST request with headers and a JSON body — core for API testing.

curl -H "Authorization: Bearer <token>" https://api.example.com/status
# Send a request with an auth header.

curl -I https://example.com
# Fetch only HTTP response headers.

curl -s -o /dev/null -w "Status: %{http_code}  Time: %{time_total}s\n" https://example.com
# Silent request that only prints status code + response time — handy for a quick API health check.

curl -v https://example.com
# Verbose mode — shows the full request/response handshake, useful for debugging SSL/headers.

wget URL
# Download a file from a URL.

ss -tuln
# Display all TCP/UDP ports currently listening on the machine —
# confirms whether the app under test actually started on the expected port (e.g., 8080).

lsof -i :8080
# Show which process is using port 8080 (great for "why won't my app start" issues).

nslookup example.com   /   dig example.com
# DNS lookup — resolve a hostname to its IP.
```

## 14. Environment Variables
```
env
# Display all environment variables.

echo $PATH
# Display the value of the PATH variable.

export TOKEN=123
# Create or update an environment variable for the current session.

source .env
# Load variables from a .env file into the current shell.

alias ll="ls -la"
# Create a shortcut for a frequently used command (add to ~/.bashrc to persist).
```

## 15. Compression
```
zip report.zip report.txt
# Compress report.txt into report.zip.

unzip report.zip
# Extract files from a ZIP archive.

tar -czf logs.tar.gz logs/
# Create a compressed tar.gz archive.

tar -xzf logs.tar.gz
# Extract files from a tar.gz archive.

gzip file.log   /   gunzip file.log.gz
# Compress/decompress a single file (common for rotated log files, e.g. app.log.gz).
```

## 16. Log Analysis
```
tail -100 app.log
# Display the last 100 log entries.

tail -f app.log
# Continuously monitor live log updates.

grep ERROR app.log
# Find all ERROR entries.

grep -E "ERROR|WARN" app.log
# Find ERROR or WARN entries.

grep -A 10 Exception app.log
# Find Java exception stack traces along with the following context lines.

watch -n 5 "tail -20 app.log"
# Re-run a command every 5 seconds — live-refreshing view without repeated typing.
```

## 17. SSH & File Transfer
```
ssh user@hostname
# Securely connect to a remote Linux server.

ssh-keygen -t ed25519
# Generate an SSH key pair (for password-less login to test/CI servers).

ssh-copy-id user@hostname
# Copy your public key to a remote server for key-based auth.

scp report.txt user@server:/tmp
# Securely copy a local file to a remote server.

scp -r reports user@server:/tmp
# Securely copy an entire directory recursively to a remote server.

rsync -avz reports/ user@server:/tmp/reports/
# Sync files/directories efficiently — only transfers what's changed (faster than scp for repeats).
```

## 18. Docker
```
docker ps
# List currently running containers.

docker ps -a
# List all containers, including stopped ones.

docker images
# List downloaded Docker images.

docker logs container-id
# Display logs of a container.

docker logs -f container-id
# Continuously stream container logs.

docker exec -it container-id bash
# Open an interactive Bash shell inside a running container.

docker stop container-id
# Gracefully stop a running container.

docker rm container-id
# Remove a stopped container.

docker-compose up -d
# Start all services defined in docker-compose.yml, in the background.

docker-compose logs -f service-name
# Stream logs for a specific service in a compose stack.
```

## 19. Kubernetes
```
kubectl get pods
# List all pods.

kubectl get svc
# List all services.

kubectl get ns
# List all namespaces.

kubectl logs pod-name
# Display pod logs.

kubectl logs -f pod-name
# Continuously stream pod logs.

kubectl describe pod pod-name
# Display detailed pod information, events and status.

kubectl exec -it pod-name -- bash
# Open a Bash shell inside a running pod.

kubectl delete pod pod-name
# Delete a pod (Kubernetes usually recreates it if managed).
```

## 20. JSON Processing (jq)
```
cat response.json | jq
# Pretty-print JSON for easier reading.

jq '.status' response.json
# Extract the "status" field from JSON.

jq -r '.status' response.json
# Same, but -r prints raw string output (no surrounding quotes) — easier to use in scripts/assertions.

jq '.user.name' response.json
# Extract a nested JSON value.

jq '.users[]' response.json
# Display every object in the users array.

jq '.users[] | select(.active == true)' response.json
# Filter array elements by a condition — e.g., only active users.

jq '.users | length' response.json
# Count how many items are in an array.
```

## 21. Scheduling & Recurring Tasks
```
crontab -e
# Edit your scheduled jobs (cron table).

0 2 * * * /home/user/run_regression.sh
# Cron syntax example: run a script every day at 2:00 AM (min hour day month weekday).

crontab -l
# List currently scheduled cron jobs.

at 18:00
# Schedule a one-off command to run later today.
```

## 22. Shell Scripting Essentials (for QA automation wrapper scripts)
```
#!/bin/bash
NAME="regression"                 # Variable assignment (no spaces around =).
echo "Running suite: $NAME"       # Reference a variable with $.

if [ $? -eq 0 ]; then             # $? holds the exit code of the previous command.
  echo "Previous step passed"
else
  echo "Previous step failed"
fi

for file in *.log; do             # Loop over all .log files in the current directory.
  echo "Processing $file"
done

./run_tests.sh || echo "Tests failed!"   # Run a script; if it fails (non-zero exit), print a message.
```
> Wrapping test runs, log archiving, or report generation into a small `.sh` script is often the difference between a repeatable pipeline step and a one-off manual command.

## 23. CI/CD & Test Automation on Linux (Playwright / Node.js focused)
```
node -v   /   npm -v
# Check Node.js and npm versions — first thing to verify on a new CI runner.

npx playwright install --with-deps
# Install Playwright browsers + OS dependencies (common CI setup step on Linux runners).

xvfb-run npx playwright test
# Run tests needing a display on a headless Linux server (xvfb = virtual framebuffer).

PWDEBUG=1 npx playwright test
# Run Playwright in debug/inspector mode.

npx playwright test --reporter=list
# Run tests with a specific reporter — useful for readable CI console output.

npm ci
# Clean install from package-lock.json — the standard for CI (faster & reproducible vs npm install).

export BASE_URL=https://staging.example.com && npx playwright test
# Pass environment-specific config (e.g., staging vs prod) into a test run.
```

## 24. System & User Info
```
uname -a          # Show kernel/OS version details.
hostname          # Show the machine's hostname.
whoami            # Show the current logged-in user.
id                # Show current user's UID/GID and group memberships.
which node        # Show the full path of a command (confirms which binary is being used).
cat /etc/os-release
                  # Show Linux distribution name and version.
```

## 25. Combining Commands (Real-World One-Liners)
```
cat app.log | grep ERROR | wc -l
# Count the total number of ERROR log entries.

cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr
# Display client IP addresses ordered by highest number of requests.

grep "2026-08-25" app.log | grep ERROR
# Find ERROR logs generated on a particular date.

find . -name "*.log" -mtime -1 -exec grep -l "Exception" {} \;
# Among files modified today, list only those containing an Exception.

ps -ef | grep node | grep -v grep
# Find node processes while excluding the grep command itself from the results.
```

## 26. Terminal Shortcuts
```
Ctrl + C      Stop the currently running command.
Ctrl + R      Search previously executed commands.
Ctrl + L      Clear the terminal screen.
Ctrl + A      Move cursor to the beginning of the line.
Ctrl + E      Move cursor to the end of the line.
history       Display previously executed commands.
!!            Re-run the previous command.
Tab           Auto-complete commands and file names.
clear         Clear the terminal screen.
```

---

## Most Used Commands in QA (Quick Index)

| Task                          | Command                                  |
|--------------------------------|-------------------------------------------|
| Finding logs                  | `find`, `grep`                            |
| Monitoring logs live           | `tail -f`                                 |
| Filtering log context          | `grep -A -B`                              |
| API testing                   | `curl`                                    |
| Parsing API/JSON responses     | `jq`                                      |
| Server login                  | `ssh`                                     |
| File transfer                 | `scp`, `rsync`                            |
| Process check                 | `ps -ef \| grep java`, `pgrep`            |
| Killing a stuck process        | `kill -9`                                 |
| Disk check                    | `df -h`, `du -sh`                         |
| Open ports                    | `ss -tuln`, `lsof -i :port`               |
| Comparing expected vs actual   | `diff -u`                                 |
| Docker debugging               | `docker logs -f`, `docker exec -it`       |
| Kubernetes debugging           | `kubectl logs -f`, `kubectl describe pod` |
| Counting log entries           | `grep ... \| wc -l`                       |
| Scheduling regression runs     | `crontab -e`                              |
| Running Playwright headless    | `xvfb-run npx playwright test`            |
| Exit code check (CI/CD)        | `echo $?`                                 |