# Quality Assurance Bug Reports

## BUG-01: Broken product images for all catalog items
* **Severity:** High
* **Priority:** High
* **Steps to Reproduce:**
  1. Log in using `problem_user` and `secret_sauce`.
  2. Observe the product images on the `/inventory.html` page.
* **Expected Result:** Each product should load its correct item image.
* **Actual Result:** All 6 items display an identical broken fallback image (a dog picture `sl-404.jpg`).

## BUG-02: "Last Name" field is completely locked on Checkout
* **Severity:** Critical
* **Priority:** High
* **Steps to Reproduce:**
  1. Log in with `problem_user` and add an item to the cart.
  2. Proceed to checkout step one.
  3. Attempt to type into the "Last Name" field.
  4. Click "Continue".
* **Expected Result:** The field accepts keyboard input.
* **Actual Result:** The field is unresponsive. Clicking continue throws a "Last Name is required" error, blocking checkout completely.

## BUG-03: Sorting dropdown fails to reorder products
* **Severity:** Medium
* **Priority:** Medium
* **Steps to Reproduce:**
  1. Log in with `problem_user`.
  2. Click the sorting dropdown on the top right.
  3. Select "Price (low to high)".
* **Expected Result:** Products visually reorder on the screen based on price ascending.
* **Actual Result:** The dropdown text changes, but the product list in the DOM remains completely unchanged (ignores sorting logic).

## BUG-04: "Remove" button unresponsive for Sauce Labs Fleece Jacket
* **Severity:** Medium
* **Priority:** High
* **Steps to Reproduce:**
  1. Log in with `problem_user`.
  2. Locate "Sauce Labs Fleece Jacket" and click "Add to cart".
  3. Click the "Remove" button that just appeared.
* **Expected Result:** Cart badge should decrement and button should revert to "Add to cart".
* **Actual Result:** The button remains stuck in the "Remove" state and the cart state fails to update.

## BUG-05: Severe performance lag during authentication routing
* **Severity:** Medium
* **Priority:** Medium
* **Steps to Reproduce:**
  1. Log in using `performance_glitch_user` and `secret_sauce`.
  2. Measure the time taken to route to the inventory page.
* **Expected Result:** Authentication routing should happen within acceptable SLA limits (< 1.5 seconds).
* **Actual Result:** There is a forced ~5-second UI freeze/hang before the application successfully routes to `/inventory.html`.