import subprocess
import os

with open('js/reactApp.js', 'r', encoding='utf-8') as f:
    code = f.read()

# We can create a small HTML file to transpile reactApp.js using babel.min.js and save the output
html_transpiler = """<!DOCTYPE html>
<html>
<head>
<script src="js/vendor/babel.min.js"></script>
</head>
<body>
<script>
try {
  var fso = new ActiveXObject("Scripting.FileSystemObject");
  var inFile = fso.OpenTextFile("js/reactApp.js", 1);
  var code = inFile.ReadAll();
  inFile.Close();

  var transformed = Babel.transform(code, { presets: ['react', 'env'] }).code;

  var outFile = fso.CreateTextFile("js/reactApp.compiled.js", true, false);
  outFile.Write(transformed);
  outFile.Close();

  window.close();
} catch (e) {
  var errFile = fso.CreateTextFile("transpile_error.txt", true);
  errFile.WriteLine(e.message || e.description || String(e));
  errFile.Close();
  window.close();
}
</script>
</body>
</html>
"""

with open('transpile.html', 'w', encoding='utf-8') as f:
    f.write(html_transpiler)

print("Running MSHTA transpiler...")
subprocess.run(['mshta.exe', os.path.abspath('transpile.html')], check=False)

if os.path.exists('js/reactApp.compiled.js'):
    size = os.path.getsize('js/reactApp.compiled.js')
    print(f"SUCCESS: js/reactApp.compiled.js generated ({size} bytes)!")
elif os.path.exists('transpile_error.txt'):
    with open('transpile_error.txt') as ef:
        print("ERROR:", ef.read())
else:
    print("Transpile script ran.")
